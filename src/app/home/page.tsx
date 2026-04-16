'use client';

import React from 'react';
import Link from 'next/link';
import { Moon, ShoppingBag, ArrowRight, Leaf, Droplets, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

const products = [
  {
    id: 1,
    name: 'Sérum Facial Noturno',
    price: 89.9,
    category: 'Rosto',
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
  },
  {
    id: 2,
    name: 'Bálsamo Labial de Mel',
    price: 24.0,
    category: 'Lábios',
    img: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=500&q=80',
  },
  {
    id: 3,
    name: 'Argila Verde Orgânica',
    price: 45.0,
    category: 'Máscaras',
    img: 'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?w=500&q=80',
  },
  {
    id: 4,
    name: 'Tônico Purificante',
    price: 56.9,
    category: 'Limpeza',
    img: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500&q=80',
  },
];

export default function HomePage() {
  const router = useRouter();

  // função que limpa o token ao realizar logout
  const handleLogout = () => {
    localStorage.removeItem('token');

    router.push('/');
  };
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-900">
      {/* --- NAVBAR --- */}
      <header className="sticky top-0 z-50 border-b border-stone-100 bg-white/70 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Moon className="h-7 w-7 text-amber-500" fill="currentColor" />
            <span className="font-serif text-xl font-bold tracking-tight">Lua Cosméticos</span>
          </div>

          <nav className="hidden gap-8 text-sm font-medium tracking-widest uppercase md:flex">
            <a href="#" className="transition-colors hover:text-amber-600">
              Loja
            </a>
            <a href="#" className="transition-colors hover:text-amber-600">
              Rotinas
            </a>
            <a href="#" className="transition-colors hover:text-amber-600">
              Sobre
            </a>
          </nav>

          <div className="flex items-center gap-5">
            {/* Trocamos o Link pelo button e adicionamos o onClick */}
            <button
              onClick={handleLogout}
              className="cursor-pointer text-sm font-semibold text-stone-500 transition-colors hover:text-red-600"
            >
              Sair
            </button>

            <button className="relative">
              <ShoppingBag className="h-6 w-6 stroke-[1.5px]" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] w-full bg-stone-100">
        <img
          src="https://images.unsplash.com/photo-1590156221122-c4464c8d8d73?w=1600&q=80"
          alt="Cosméticos Naturais"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 px-4 text-center">
          <h2 className="max-w-4xl font-serif text-5xl leading-tight font-light text-white md:text-7xl">
            Sua pele merece o toque <br /> <span className="italic">puro da natureza</span>.
          </h2>
          <Link
            href="/loja"
            className="mt-10 flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold tracking-widest text-stone-900 uppercase transition-transform hover:scale-105"
          >
            Ver Produtos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* --- DIFERENCIAIS --- */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <Leaf className="mb-4 h-8 w-8 text-emerald-700" />
            <h4 className="font-bold tracking-tighter uppercase">100% Vegano</h4>
            <p className="mt-2 text-sm text-stone-500">
              Sem ingredientes de origem animal ou testes em bichinhos.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Droplets className="mb-4 h-8 w-8 text-blue-500" />
            <h4 className="font-bold tracking-tighter uppercase">Óleos Essenciais</h4>
            <p className="mt-2 text-sm text-stone-500">
              Extraídos diretamente das plantas para o seu autocuidado.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Sparkles className="mb-4 h-8 w-8 text-amber-500" />
            <h4 className="font-bold tracking-tighter uppercase">Brilho Natural</h4>
            <p className="mt-2 text-sm text-stone-500">
              Fórmulas que realçam sua beleza sem agredir o equilíbrio da pele.
            </p>
          </div>
        </div>
      </section>

      {/* --- VITRINE DE PRODUTOS --- */}
      <section className="bg-stone-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <span className="text-sm font-bold tracking-[0.3em] text-amber-600 uppercase">
                Destaques
              </span>
              <h3 className="mt-2 font-serif text-4xl">Favoritos do Mês</h3>
            </div>
            <a
              href="#"
              className="hidden text-sm font-bold underline decoration-amber-500 underline-offset-8 md:block"
            >
              Ver todos os produtos
            </a>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="group relative flex flex-col bg-white p-4 shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="mt-6">
                  <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                    {p.category}
                  </span>
                  <h5 className="mt-1 font-medium">{p.name}</h5>
                  <p className="mt-2 font-bold text-stone-900">
                    R$ {p.price.toFixed(2).replace('.', ',')}
                  </p>
                </div>
                <button className="mt-4 flex w-full items-center justify-center gap-2 border border-stone-900 py-3 text-xs font-bold uppercase transition-colors hover:bg-stone-900 hover:text-white">
                  <ShoppingBag className="h-4 w-4" /> Comprar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER --- */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <div className="rounded-2xl bg-stone-900 px-8 py-16 text-white">
          <h3 className="font-serif text-3xl italic">Receba dicas de beleza natural</h3>
          <p className="mt-4 text-stone-400">
            Inscreva-se para ganhar 10% de desconto na sua primeira compra.
          </p>
          <form className="mx-auto mt-8 flex max-w-md gap-2">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="w-full rounded-md border-none bg-stone-800 px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500"
            />
            <button className="rounded-md bg-amber-500 px-6 py-3 text-sm font-bold text-stone-900 hover:bg-amber-400">
              OK
            </button>
          </form>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-stone-200 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-stone-400">
          <p>&copy; {new Date().getFullYear()} Lua Cosméticos — Feito com amor e natureza.</p>
        </div>
      </footer>
    </div>
  );
}
