import { api } from './api';

export const AuthService = {
  async login(email: string, password: string): Promise<string> {
    const response = await api.post('auth/login', { email, password });
    const accessToken = response.data?.userLog?.access_token;

    if (!accessToken) {
      throw new Error('Token not found');
    }

    return accessToken;
  },
};
