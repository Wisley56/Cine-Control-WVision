'use client';

import { useEffect, useState } from 'react';
import { Sala } from '../../interfaces/sala'; 
import { localStorageManager } from '../../lib/localStorageManager';
import Loader from '../layout/Loader'; 

export default function SalaList() {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarSalas();
  }, []);

  const carregarSalas = () => {
    const salasSalvas = localStorageManager.getSalas();
    setSalas(salasSalvas);
    setLoading(false);
  };

  if (loading) {
    return <Loader message="Carregando salas..." />;
  }

  if (salas.length === 0) {
    return <p className="text-center text-[var(--muted-text)] py-10">Nenhuma sala cadastrada.</p>;
  }

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 bg-[var(--background)]">
        <h1 className="text-center mb-12 text-4xl font-bold tracking-tight text-[var(--primary-accent)] sm:text-5xl">
          Salas Cadastradas
        </h1>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {salas.map((sala) => (
            <div 
              key={sala.id} 
              className="group block rounded-lg bg-[var(--card-background)] shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out border border-[var(--border-color)]"
            >
              <h3 className="text-xl font-semibold text-[var(--highlight-text)] text-center mb-2">
                {sala.nome}
              </h3>
              <p className="text-center text-[var(--muted-text)] text-sm">
                Capacidade: {sala.capacidade}
              </p>
              <p className="text-center text-[var(--muted-text)] text-sm mt-1">             
                Tipo: {sala.tipo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}