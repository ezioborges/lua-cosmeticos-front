export const AuthService = {
  async login(email: string, password: string): Promise<string> {
    const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';
    const response = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      let message = 'Request failed';
      const contentType = response.headers.get('content-type') ?? '';

      if (contentType.includes('application/json')) {
        const data = (await response.json()) as { message?: string };
        if (data.message) {
          message = data.message;
        }
      } else {
        const text = await response.text();
        if (text) {
          message = text;
        }
      }

      throw new Error(message);
    }

    const data = (await response.json()) as { userLog?: { access_token?: string } };
    const accessToken = data.userLog?.access_token;

    if (!accessToken) {
      throw new Error('Token not found');
    }

    return accessToken;
  },
};
