'use client';

import { LogOut, Moon, ShoppingBag, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Header() {
  const router = useRouter();
  const pathName = usePathname(); // pega a URL atual (ex: '/', '/login)

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cria o estado que vai controlar o Toggle
  // useEffect monitora as mudanças de estado
  // Assim que o cabeçalho é carregado na tela, ele procura o Token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(!!token); // o '!!' transforma o token em boleano para fazer a troca entre 'Entrar' e 'Sair'
    }
  }, [pathName]); // agora o useEffect fica observado as mudanças do pathname

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); // se não tiver token o botão muda para 'Entrar'
    router.push('/');
  };

  if (pathName === '/login') {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-stone-100 bg-white/70 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Moon className="h-7 w-7 text-amber-500" fill="currentColor" />
          <span className="font-serif text-xl font-bold tracking-tight">Lua Cosméticos</span>
        </div>

        <div className="flex items-center gap-5">
          {isLoggedIn ? (
            // Logado
            <button
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-stone-500 transition-colors hover:text-red-600"
            >
              <LogOut className="h-4 w-4" /> Sair
            </button>
          ) : (
            // Deslogado
            <button
              onClick={() => router.push('/login')}
              className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-stone-500 transition-colors hover:text-amber-600"
            >
              <User className="h-4 w-4" /> Entrar
            </button>
          )}

          <button className="relative">
            <ShoppingBag className="h-6 w-6 stroke-[1.5px]" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
