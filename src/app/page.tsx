'use client'; // Necessário para usar hooks do React

// Dados simulados para o caso de estudo
const featuredProducts = [
  {
    id: 1,
    name: 'Sérum Facial Iluminador',
    price: 'R$ 89,90',
    category: 'Skincare',
    imageUrl:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Creme Hidratante Corporal',
    price: 'R$ 65,00',
    category: 'Corpo',
    imageUrl:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Óleo Essencial de Lavanda',
    price: 'R$ 45,50',
    category: 'Bem-estar',
    imageUrl:
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Sabonete Argila Rosa',
    price: 'R$ 28,00',
    category: 'Banho',
    imageUrl:
      'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=400&q=80',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-stone-200">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1920&q=80"
            alt="Ingredientes naturais"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-stone-900/30 mix-blend-multiply" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            A natureza cuidando da sua pele.
          </h2>
          <p className="mb-8 text-lg text-stone-100 sm:text-xl">
            Fórmulas limpas, veganas e cruelty-free. Revele o seu brilho natural com ingredientes
            que respeitam você e o meio ambiente.
          </p>
          <button className="rounded-full bg-amber-500 px-8 py-3 text-sm font-bold tracking-wider text-stone-900 uppercase transition-all hover:bg-amber-400 hover:shadow-lg">
            Explorar Coleção
          </button>
        </div>
      </section>

      {/* VITRINE DE PRODUTOS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h3 className="text-3xl font-bold text-stone-900">Mais Vendidos</h3>
          <p className="mt-2 text-stone-500">Os queridinhos da nossa comunidade.</p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group relative cursor-pointer">
              <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-xl bg-stone-200">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-72 w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <p className="text-xs tracking-wider text-stone-500 uppercase">
                    {product.category}
                  </p>
                  <h4 className="text-sm font-medium text-stone-900">{product.name}</h4>
                </div>
                <p className="text-sm font-bold text-stone-900">{product.price}</p>
              </div>
              <button className="mt-3 w-full rounded-lg border border-stone-900 py-2 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-900 hover:text-white">
                Adicionar
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
