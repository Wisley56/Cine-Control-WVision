'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { localStorageManager } from '@/lib/localStorageManager';
import Button from '@/components/buttons/Button'; // Já estilizado
import { Filme } from '@/interfaces/filme';
import Loader from '@/components/layout/Loader'; // Já estilizado

export default function FilmeDetalhesPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [filme, setFilme] = useState<Filme | null>(null);
  const [loading, setLoading] = useState(true); // Adicionado estado de loading

  useEffect(() => {
    if (!id) {
      setLoading(false); // Para o loading se não houver ID
      return;
    }
    setLoading(true); // Inicia o loading ao buscar
    const filmes = localStorageManager.getFilmes();
    const encontrado = filmes.find(f => f.id === id);
    setFilme(encontrado || null);
    setLoading(false); // Finaliza o loading após encontrar ou não
  }, [id]);

  // Estado de Carregamento
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-var(--navbar-height,68px))] bg-[var(--background)]">
        <Loader message="Carregando detalhes do filme..." />
      </div>
    );
  }

  // Filme não encontrado após o carregamento
  if (!filme) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-var(--navbar-height,68px))] bg-[var(--background)] text-center p-4">
        <h1 className="text-2xl text-[var(--primary-accent)] mb-4">Filme não encontrado</h1>
        <p className="text-[var(--muted-text)] mb-6">O filme que você está procurando não existe ou foi removido.</p>
        <Button onClick={() => router.push('/filmes')} variant="primary">
          Voltar para Filmes
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--background)] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-[var(--card-background)] shadow-2xl rounded-lg overflow-hidden border border-[var(--border-color)]">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/3 lg:w-2/5"> {/* Ajuste de largura para a imagem */}
            <img
              className="h-auto w-full object-cover md:h-full" // Ajustado para h-auto no mobile e md:h-full
              src={filme.imagemUrl || 'https://via.placeholder.com/400x600?text=Sem+Imagem'}
              alt={`Poster do filme ${filme.titulo}`}
            />
          </div>
          <div className="p-8 flex-grow md:w-2/3 lg:w-3/5"> {/* Ajuste de largura para o conteúdo */}
            <div className="uppercase tracking-wide text-sm text-[var(--secondary-accent)] font-semibold">{filme.genero}</div>
            <h1 className="block mt-1 text-3xl lg:text-4xl leading-tight font-bold text-[var(--primary-accent)]">{filme.titulo}</h1> {/* Removido hover:underline para consistência, mas pode ser readicionado */}
            <p className="mt-4 text-[var(--foreground)] opacity-90 leading-relaxed">{filme.descricao}</p>
            
            <div className="mt-6 space-y-2">
              <p className="text-sm text-[var(--muted-text)]">
                <strong className="font-medium text-[var(--foreground)] opacity-90">Classificação:</strong> {filme.classificacao}
              </p>
              <p className="text-sm text-[var(--muted-text)]">
                <strong className="font-medium text-[var(--foreground)] opacity-90">Duração:</strong> {filme.duracao} minutos
              </p>
              <p className="text-sm text-[var(--muted-text)]">
                <strong className="font-medium text-[var(--foreground)] opacity-90">Data de Estreia:</strong> {new Date(filme.dataEstreia).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-8">
              <Button onClick={() => router.push('/sessoes')} variant="primary">
                Ver Sessões Disponíveis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}