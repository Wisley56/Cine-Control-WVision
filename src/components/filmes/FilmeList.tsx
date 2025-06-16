'use client';

import { useEffect, useState } from 'react';
import { Filme } from '../../interfaces/filme';
import Link from 'next/link';
import Loader from '../layout/Loader';
import { api } from '@/services/api';

export default function FilmeList() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarFilmes();
  }, []);

  const carregarFilmes = () => {
    setLoading(true);
    api.getFilmes()
      .then(data => {
        setFilmes(data);
      })
      .catch(error => {
        console.error("Erro ao carregar filmes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Loader message="Carregando filmes..." />;
  }

  if (filmes.length === 0) {
    return <p className="text-center text-[var(--muted-text)] py-10">Nenhum filme cadastrado.</p>;
  }

  return (
    <div className="bg-[var(--background)]">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
         <h1 className="text-center mb-8 sm:mb-12 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--primary-accent)]">
          Filmes Disponíveis
        </h1>

        <div className="grid grid-cols-1 gap-x-4 gap-y-8 xs:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filmes.map((filme) => (
            <Link
              key={filme.id}
              href={`/filmes/${filme.id}`}
              className="group block bg-[var(--card-background)] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out border border-[var(--border-color)]"
            >
              <div className="aspect-w-2 aspect-h-3 w-full overflow-hidden rounded-t-lg bg-[var(--secondary-accent)]"> {/* Adjusted aspect ratio for typical movie posters */}
                <img
                  src={filme.imagemUrl || 'https://via.placeholder.com/300x450?text=Sem+Imagem'}
                  alt={`Poster do filme ${filme.titulo}`}
                  className="h-full w-full object-cover object-center group-hover:opacity-80 transition-opacity duration-300"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="mt-1 text-base sm:text-lg font-semibold text-[var(--highlight-text)] group-hover:text-[var(--primary-accent)] transition-colors duration-300 truncate"> {/* Truncate long titles */}
                  {filme.titulo}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[var(--muted-text)]">{filme.genero}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}