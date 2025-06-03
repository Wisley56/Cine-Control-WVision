'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { localStorageManager } from '@/lib/localStorageManager';
import Button from '@/components/buttons/Button';
import { Filme } from '@/interfaces/filme';
import Loader from '@/components/layout/Loader';
import Modal from '@/components/modal/Modal';

export default function FilmeDetalhesPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [filme, setFilme] = useState<Filme | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const filmes = localStorageManager.getFilmes();
    const encontrado = filmes.find(f => f.id === id);
    setFilme(encontrado || null);
    setLoading(false);
  }, [id]);

  const handleOpenDeleteConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleCloseDeleteConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handlePerformDeleteFilme = () => {
    if (filme && filme.id) {
      localStorageManager.deleteFilme(filme.id);
      handleCloseDeleteConfirmModal();
      router.push('/filmes');
    } else {
      console.error("Não foi possível excluir: filme ou ID do filme não definido.");
      handleCloseDeleteConfirmModal();
    }
  };

  const mainContentMinHeight = "min-h-[calc(100vh-68px)]"; 

  if (loading) {
    return (
      <div className={`flex justify-center items-center ${mainContentMinHeight} bg-[var(--background)]`}>
        <Loader message="Carregando detalhes do filme..." />
      </div>
    );
  }

  if (!filme) {
    return (
      <div className={`flex flex-col justify-center items-center ${mainContentMinHeight} bg-[var(--background)] text-center p-4`}>
        <h1 className="text-xl sm:text-2xl text-[var(--primary-accent)] mb-4">Filme não encontrado</h1>
        <p className="text-[var(--muted-text)] mb-6 text-sm sm:text-base">O filme que você está procurando não existe ou foi removido.</p>
        <Button onClick={() => router.push('/filmes')} variant="primary">
          Voltar para Filmes
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className={`bg-[var(--background)] ${mainContentMinHeight} py-8 sm:py-12 px-4`}>
        <div className="max-w-3xl lg:max-w-4xl mx-auto bg-[var(--card-background)] shadow-2xl rounded-lg overflow-hidden border border-[var(--border-color)]">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-2/5 lg:w-1/3">
              <img
                className="h-auto w-full object-cover md:h-full aspect-[2/3] md:aspect-auto" 
                src={filme.imagemUrl || 'https://via.placeholder.com/400x600?text=Sem+Imagem'}
                alt={`Poster do filme ${filme.titulo}`}
              />
            </div>
            <div className="p-6 sm:p-8 flex-grow md:w-3/5 lg:w-2/3 flex flex-col justify-between">
              <div>
                <div className="uppercase tracking-wide text-xs sm:text-sm text-[var(--secondary-accent)] font-semibold">{filme.genero}</div>
                <h1 className="block mt-1 text-2xl sm:text-3xl lg:text-4xl leading-tight font-bold text-[var(--primary-accent)]">{filme.titulo}</h1>
                <p className="mt-3 sm:mt-4 text-[var(--foreground)] opacity-90 leading-relaxed text-sm sm:text-base">{filme.descricao}</p>

                <div className="mt-4 sm:mt-6 space-y-1.5 sm:space-y-2">
                  <p className="text-xs sm:text-sm text-[var(--muted-text)]">
                    <strong className="font-medium text-[var(--foreground)] opacity-90">Classificação:</strong> {filme.classificacao}
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--muted-text)]">
                    <strong className="font-medium text-[var(--foreground)] opacity-90">Duração:</strong> {filme.duracao} minutos
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--muted-text)]">
                    <strong className="font-medium text-[var(--foreground)] opacity-90">Data de Estreia:</strong> {new Date(filme.dataEstreia + "T00:00:00").toLocaleDateString()} {/* Ensure date is parsed as local */}
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button onClick={() => router.push('/sessoes')} variant="primary" className="w-full sm:w-auto">
                  Ver Sessões
                </Button>
                <Button onClick={handleOpenDeleteConfirmModal} variant="danger" className="w-full sm:w-auto">
                  Excluir Filme
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isConfirmModalOpen} onClose={handleCloseDeleteConfirmModal}>
        <div className="text-center p-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-[var(--highlight-text)] mb-4">
            Confirmar Exclusão
          </h3>
          <p className="text-[var(--foreground)] mb-2 text-sm sm:text-base">
            Tem certeza que deseja excluir o filme <strong className="text-[var(--primary-accent)]">{filme?.titulo}</strong>?
          </p>
          <p className="text-xs sm:text-sm text-[var(--muted-text)] mb-6">
            Todas as sessões associadas a este filme também serão excluídas. Esta ação não pode ser desfeita.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button onClick={handleCloseDeleteConfirmModal} variant="secondary" className="min-w-[100px] w-full sm:w-auto">
              Cancelar
            </Button>
            <Button onClick={handlePerformDeleteFilme} variant="danger" className="min-w-[100px] w-full sm:w-auto">
              Excluir Filme
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}