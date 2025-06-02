'use client';

import { useEffect, useState } from 'react';
import { Filme } from '../../interfaces/filme';
import { localStorageManager } from '../../lib/localStorageManager';
import Link from 'next/link';
import Loader from '../layout/Loader'; // Lembre-se de que o componente Loader também precisará ser estilizado para o tema escuro.

export default function FilmeList() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarFilmes();
  }, []);

  const carregarFilmes = () => {
    const filmesSalvos = localStorageManager.getFilmes();
    setFilmes(filmesSalvos);
    setLoading(false);
  };

  if (loading) {
    // Certifique-se de que o componente Loader (e sua mensagem) esteja visível e estilizado para o tema escuro.
    // Ex: O texto "Carregando filmes..." deve usar var(--foreground) ou var(--muted-text).
    return <Loader message="Carregando filmes..." />;
  }

  if (filmes.length === 0) {
    return <p className="text-center text-[var(--muted-text)] py-10">Nenhum filme cadastrado.</p>; 
    // DE: text-gray-500
  }

  return (
    <div className="bg-[var(--background)]">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-center mb-12 text-4xl font-bold tracking-tight text-[var(--primary-accent)] sm:text-5xl">
          Filmes Disponíveis
        </h1>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filmes.map((filme) => (
            <Link
              key={filme.id}
              href={`/filmes/${filme.id}`}
              className="group block bg-[var(--card-background)] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out border border-[var(--border-color)]"
              
            >
              <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-t-lg bg-[var(--secondary-accent)]"> {/* Ou var(--background) para um placeholder mais escuro */}

                <img
                  src={filme.imagemUrl || 'https://via.placeholder.com/300x400?text=Sem+Imagem'}
                  alt={`Poster do filme ${filme.titulo}`}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300" // Adicionado transition para opacidade
                />
              </div>
              <div className="p-4">
                <h3 className="mt-1 text-lg font-semibold text-[var(--highlight-text)] group-hover:text-[var(--primary-accent)] transition-colors duration-300">
                  {filme.titulo}
                </h3>
                <p className="mt-1 text-sm text-[var(--muted-text)]">{filme.genero}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}