'use client'; // Necessário para usar states e formulários no App Router

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { Moon } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      const accessToken = response.data?.userLog.access_token;

      if (!accessToken) {
        throw new Error('Token not found');
      }

      // Salvando o token (ajuste conforme seu retorno da API)
      localStorage.setItem('token', accessToken);


      // Redireciona para a home ou dashboard
      router.push('/home');
    } catch (err: any) {
      setError('Credenciais inválidas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-brand-dark flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <div className="bg-brand-dark mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <Moon className="text-amber-400 h-20 w-20" fill="currentColor" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Lua Cosméticos
          </h2>
        </div>

        {/* Formulário */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:border-brand-gold focus:ring-brand-gold mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none sm:text-sm"
                placeholder="exemplo@email.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:border-brand-gold focus:ring-brand-gold mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group bg-brand-dark text-brand-gold focus:ring-brand-gold relative flex w-full justify-center rounded-lg px-4 py-3 text-sm font-bold transition-all hover:brightness-110 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
            >
              {loading ? 'Carregando...' : 'ENTRAR'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Ainda não tem conta?{' '}
            <a href="#" className="text-brand-dark font-medium hover:underline">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
