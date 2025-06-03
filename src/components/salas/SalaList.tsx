'use client';

import { useEffect, useState } from 'react';
import { Sala } from '../../interfaces/sala';
import { localStorageManager } from '../../lib/localStorageManager';
import Loader from '../layout/Loader';

const IconCapacity = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1.5 opacity-80">
    <path d="M7.5 6A3.5 3.5 0 004 9.5V12a1 1 0 001 1h1a1 1 0 001-1V9.5A1.5 1.5 0 018.5 8h0A1.5 1.5 0 0110 9.5V12a1 1 0 001 1h1a1 1 0 001-1V9.5A3.5 3.5 0 009.5 6h-2zM16.5 6a3.5 3.5 0 00-3.5 3.5V12a1 1 0 001 1h1a1 1 0 001-1V9.5A1.5 1.5 0 0117.5 8h0A1.5 1.5 0 0119 9.5V12a1 1 0 001 1h1a1 1 0 001-1V9.5A3.5 3.5 0 0016.5 6h-2z" />
    <path fillRule="evenodd" d="M2 15.5A2.5 2.5 0 004.5 18H19.5a2.5 2.5 0 002.5-2.5V15a1 1 0 00-1-1H3a1 1 0 00-1 1v.5zM5.78 19.37A4.002 4.002 0 014.5 20H2.75a.75.75 0 000 1.5h1.42c.093.000.13.000.157.000A5.502 5.502 0 009.07 23h5.86a5.502 5.502 0 005.233-1.5H21.25a.75.75 0 000-1.5h-1.75a4.002 4.002 0 01-1.33-.63z" clipRule="evenodd" />
  </svg>
);

const IconDimension = ({ type }: { type: '2D' | '3D' | 'IMAX' }) => {
  let path;
  if (type === '3D') {
    path = <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a2.25 2.25 0 11-4.5 0 .75.75 0 00-1.5 0 2.25 2.25 0 11-4.5 0M10.5 6V4.5m0 1.5V19.5m0-15A2.25 2.25 0 008.25 8.25v11.25" />;
  } else if (type === 'IMAX') {
    path = <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.375 .565A3 3 0 018.25 19.5H7.5a3 3 0 01-3-3V7.5a3 3 0 013-3h5.25a3 3 0 013 3v8.25a3 3 0 01-3 3h-1.5m0-3H15v-2.25H9v2.25m0 0H7.5m1.5 0H15M9 12H7.5m1.5 0H15m-6.75-3.75h.008v.008H9.75v-.008zm0 3h.008v.008H9.75v-.008zm0 3h.008v.008H9.75v-.008zm3-6h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm3-6h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  } else { // 2D
    path = <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.374L13.16 19.5M16.5 7.5v1.5M18.375 9.375h1.5M16.5 13.5v1.5M18.375 11.625h1.5m-1.875 6.375l1.84 1.874M14.625 7.5h1.5M8.25 15h-1.5m1.875-6.375L6.46 6.5M9.375 7.5H7.5m1.875 6.375l-1.84 1.874M11.625 15h-1.5" />;
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1.5 opacity-80">
      {path}
    </svg>
  );
};


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
    <div className="bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <h1 className="text-center mb-8 sm:mb-12 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--primary-accent)]">
          Salas Cadastradas
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {salas.map((sala) => (
            <div
              key={sala.id}
              className="group flex flex-col bg-[var(--card-background)] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-[var(--border-color)] overflow-hidden"
            >
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl lg:text-2xl font-semibold text-[var(--highlight-text)] group-hover:text-[var(--primary-accent)] transition-colors duration-200 mb-3 text-center sm:text-left">
                  {sala.nome}
                </h3>
                <div className="mt-auto space-y-2.5">
                  <div className="flex items-center text-[var(--muted-text)]">
                    <IconCapacity />
                    <span className="text-sm font-medium text-[var(--foreground)] opacity-90">Capacidade:</span>
                    <span className="ml-2 text-sm">{sala.capacidade} pessoas</span>
                  </div>
                  <div className="flex items-center text-[var(--muted-text)]">
                    <IconDimension type={sala.tipo} />
                    <span className="text-sm font-medium text-[var(--foreground)] opacity-90">Tipo:</span>
                    <span className="ml-2 text-sm">{sala.tipo}</span>
                  </div>
                </div>
              </div>
              {/* Opcional: Adicionar um rodapé ao card no futuro */}
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}