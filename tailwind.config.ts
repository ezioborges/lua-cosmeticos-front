import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sugestão para a identidade da Lua Cosméticos:
        brand: {
          gold: '#F0E68C', // A cor que usamos no seu SVG!
          dark: '#1A1D2D',
        },
      },
    },
  },
  plugins: [],
};
export default config;
