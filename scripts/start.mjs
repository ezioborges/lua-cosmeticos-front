import { readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import net from 'node:net';
import { platform } from 'node:os';

const envFilePath = new URL('../.env.local', import.meta.url);
const nextMode = process.argv[2] === 'dev' ? 'dev' : 'start';

function parseEnv(content) {
  const parsed = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const equalsIndex = line.indexOf('=');
    if (equalsIndex === -1) {
      continue;
    }

    const key = line.slice(0, equalsIndex).trim();
    const value = line.slice(equalsIndex + 1).trim();
    parsed[key] = value;
  }

  return parsed;
}

async function loadEnv() {
  try {
    const envContent = await readFile(envFilePath, 'utf8');
    const parsedEnv = parseEnv(envContent);

    for (const [key, value] of Object.entries(parsedEnv)) {
      process.env[key] = value;
    }
  } catch {
    // Ignore missing env file and let Next fall back to defaults.
  }
}

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.unref();
    server.once('error', () => resolve(false));
    server.listen(port, '0.0.0.0', () => {
      server.close(() => resolve(true));
    });
  });
}

async function findAvailablePort(startPort) {
  for (let port = startPort; port < startPort + 20; port += 1) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }

  throw new Error(`No available port found starting at ${startPort}`);
}

function openBrowser(targetUrl) {
  if (process.env.CI === 'true' || process.env.CI === '1') {
    return;
  }

  const currentPlatform = platform();
  const command =
    currentPlatform === 'darwin'
      ? 'open'
      : currentPlatform === 'win32'
        ? 'cmd'
        : 'xdg-open';

  const args =
    currentPlatform === 'win32' ? ['/c', 'start', '', targetUrl] : [targetUrl];

  const opener = spawn(command, args, {
    detached: true,
    stdio: 'ignore',
  });

  opener.once('error', () => {});
  opener.unref();
}

await loadEnv();

const requestedPort = Number(process.env.PORT || 3000);
const port = Number.isFinite(requestedPort)
  ? await findAvailablePort(requestedPort)
  : 3000;

process.env.PORT = String(port);

const url = `http://localhost:${port}`;

const nextExecutable =
  process.platform === 'win32'
    ? '.\\node_modules\\.bin\\next.cmd'
    : './node_modules/.bin/next';

const child = spawn(nextExecutable, [nextMode], {
  env: process.env,
  stdio: ['inherit', 'pipe', 'pipe'],
});

let browserOpened = false;
const openOnce = () => {
  if (browserOpened) {
    return;
  }

  browserOpened = true;
  openBrowser(url);
};

const handleOutput = (chunk) => {
  const text = chunk.toString();
  process.stdout.write(text);

  if (/Local:\s+http:\/\/localhost:\d+/.test(text)) {
    openOnce();
  }
};

child.stdout.on('data', handleOutput);
child.stderr.on('data', (chunk) => {
  process.stderr.write(chunk);
});

const fallbackTimer = setTimeout(openOnce, 2500);

child.on('exit', (code, signal) => {
  clearTimeout(fallbackTimer);

  if (signal) {
    process.exitCode = 1;
    return;
  }

  process.exitCode = code ?? 0;
});

process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
