export const AuthService = {
  async login(email: string, password: string): Promise<string> {
    const baseURL =
      process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';
    const response = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || 'Request failed');
    }

    const data =
      (await response.json()) as { userLog?: { access_token?: string } };
    const accessToken = data.userLog?.access_token;

    if (!accessToken) {
      throw new Error('Token not found');
    }

    return accessToken;
  },
};
