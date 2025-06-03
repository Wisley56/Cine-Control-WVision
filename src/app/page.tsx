'use client';

import { useEffect, useState } from 'react';
import { localStorageManager } from '@/lib/localStorageManager';
import { Filme } from '@/interfaces/filme';
import FilmeCarousel from '@/components/home/FilmeCarousel';
import Loader from '@/components/layout/Loader';

export default function Home() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const todosFilmes = localStorageManager.getFilmes();
    setFilmes(todosFilmes);
    setLoading(false);
  }, []);

  const mainMinHeight = "min-h-[calc(100vh-68px)]";

  if (loading) {
    return (
      <main className={`flex flex-col items-center justify-center ${mainMinHeight} p-4 sm:p-8 text-center bg-[var(--background)]`}>
        <Loader message="Carregando filmes..." />
      </main>
    );
  }

  return (
    <main className={`flex flex-col items-center ${mainMinHeight} p-4 sm:p-6 md:p-8 bg-[var(--background)]`}>
      {filmes.length >= 1 ? ( 
        <FilmeCarousel filmes={filmes} />
      ) : (
        <div className="text-center flex flex-col justify-center flex-grow py-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--primary-accent)] mb-4">
            Bem-vindo ao WVision Cine Manager!
          </h1>
          <p className="text-lg sm:text-xl text-[var(--muted-text)] mb-8 max-w-xl mx-auto">
            Sua plataforma para gerenciar filmes, salas e sessões de cinema.
          </p>
          {filmes.length === 0 && (
             <p className="text-md sm:text-lg text-[var(--foreground)] opacity-75">
              Nenhum filme cadastrado ainda. Adicione seus filmes para começar a gerenciar suas sessões de cinema!
            </p>
          )}
        </div>
      )}
    </main>
  );
}