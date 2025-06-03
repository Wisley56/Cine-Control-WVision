// src/app/filmes/[id]/page.tsx
'use client';

import { useRouter, useParams } from 'next/navigation'; ///page.tsx]
import { useEffect, useState } from 'react'; ///page.tsx]
import { localStorageManager } from '@/lib/localStorageManager'; ///page.tsx]
import Button from '@/components/buttons/Button'; ///page.tsx]
import { Filme } from '@/interfaces/filme'; ///page.tsx]
import Loader from '@/components/layout/Loader'; ///page.tsx]
import Modal from '@/components/modal/Modal'; // Importar Modal

export default function FilmeDetalhesPage() {
  const router = useRouter(); ///page.tsx]
  const params = useParams(); ///page.tsx]
  const id = params.id as string; ///page.tsx]
  const [filme, setFilme] = useState<Filme | null>(null); ///page.tsx]
  const [loading, setLoading] = useState(true); ///page.tsx]

  // Estados para o modal de confirmação de exclusão
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    if (!id) { ///page.tsx]
      setLoading(false); ///page.tsx]
      return; ///page.tsx]
    }
    setLoading(true); ///page.tsx]
    const filmes = localStorageManager.getFilmes(); ///page.tsx]
    const encontrado = filmes.find(f => f.id === id); ///page.tsx]
    setFilme(encontrado || null); ///page.tsx]
    setLoading(false); ///page.tsx]
  }, [id]); ///page.tsx]

  const handleOpenDeleteConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleCloseDeleteConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handlePerformDeleteFilme = () => {
    if (filme && filme.id) {
      localStorageManager.deleteFilme(filme.id); // Chama a função que já exclui em cascata
      handleCloseDeleteConfirmModal();
      router.push('/filmes'); // Redireciona para a lista de filmes após a exclusão
    } else {
      // Tratar caso em que filme ou filme.id não está definido, se necessário
      console.error("Não foi possível excluir: filme ou ID do filme não definido.");
      handleCloseDeleteConfirmModal();
    }
  };

  if (loading) { ///page.tsx]
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-var(--navbar-height,68px))] bg-[var(--background)]"> {/*/page.tsx] */}
        <Loader message="Carregando detalhes do filme..." /> {/*/page.tsx] */}
      </div>
    );
  }

  if (!filme) { ///page.tsx]
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-var(--navbar-height,68px))] bg-[var(--background)] text-center p-4"> {/*/page.tsx] */}
        <h1 className="text-2xl text-[var(--primary-accent)] mb-4">Filme não encontrado</h1> {/*/page.tsx] */}
        <p className="text-[var(--muted-text)] mb-6">O filme que você está procurando não existe ou foi removido.</p> {/*/page.tsx] */}
        <Button onClick={() => router.push('/filmes')} variant="primary"> {/*/page.tsx] */}
          Voltar para Filmes
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[var(--background)] min-h-screen py-12 px-4 sm:px-6 lg:px-8"> {/*/page.tsx] */}
        <div className="max-w-4xl mx-auto bg-[var(--card-background)] shadow-2xl rounded-lg overflow-hidden border border-[var(--border-color)]"> {/*/page.tsx] */}
          <div className="md:flex"> {/*/page.tsx] */}
            <div className="md:flex-shrink-0 md:w-1/3 lg:w-2/5"> {/*/page.tsx] */}
              <img
                className="h-auto w-full object-cover md:h-full" ///page.tsx]
                src={filme.imagemUrl || 'https://via.placeholder.com/400x600?text=Sem+Imagem'} ///page.tsx]
                alt={`Poster do filme ${filme.titulo}`} ///page.tsx]
              />
            </div>
            <div className="p-8 flex-grow md:w-2/3 lg:w-3/5 flex flex-col justify-between"> {/*/page.tsx] */}
              <div> {/* Container para conteúdo principal, excluindo botões de ação */}
                <div className="uppercase tracking-wide text-sm text-[var(--secondary-accent)] font-semibold">{filme.genero}</div> {/*/page.tsx] */}
                <h1 className="block mt-1 text-3xl lg:text-4xl leading-tight font-bold text-[var(--primary-accent)]">{filme.titulo}</h1> {/*/page.tsx] */}
                <p className="mt-4 text-[var(--foreground)] opacity-90 leading-relaxed">{filme.descricao}</p> {/*/page.tsx] */}
                
                <div className="mt-6 space-y-2"> {/*/page.tsx] */}
                  <p className="text-sm text-[var(--muted-text)]"> {/*/page.tsx] */}
                    <strong className="font-medium text-[var(--foreground)] opacity-90">Classificação:</strong> {filme.classificacao} {/*/page.tsx] */}
                  </p>
                  <p className="text-sm text-[var(--muted-text)]"> {/*/page.tsx] */}
                    <strong className="font-medium text-[var(--foreground)] opacity-90">Duração:</strong> {filme.duracao} minutos {/*/page.tsx] */}
                  </p>
                  <p className="text-sm text-[var(--muted-text)]"> {/*/page.tsx] */}
                    <strong className="font-medium text-[var(--foreground)] opacity-90">Data de Estreia:</strong> {new Date(filme.dataEstreia).toLocaleDateString()} {/*/page.tsx] */}
                  </p>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button onClick={() => router.push('/sessoes')} variant="primary" className="w-full sm:w-auto"> {/*/page.tsx] */}
                  Ver Sessões Disponíveis
                </Button>
                <Button onClick={handleOpenDeleteConfirmModal} variant="danger" className="w-full sm:w-auto">
                  Excluir Filme
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      <Modal isOpen={isConfirmModalOpen} onClose={handleCloseDeleteConfirmModal}>
        <div className="text-center p-4">
          <h3 className="text-2xl font-semibold text-[var(--highlight-text)] mb-4">
            Confirmar Exclusão
          </h3>
          <p className="text-[var(--foreground)] mb-2">
            Tem certeza que deseja excluir o filme <strong className="text-[var(--primary-accent)]">{filme?.titulo}</strong>?
          </p>
          <p className="text-sm text-[var(--muted-text)] mb-6">
            Todas as sessões associadas a este filme também serão excluídas. Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={handleCloseDeleteConfirmModal} variant="secondary" className="min-w-[100px]">
              Cancelar
            </Button>
            <Button onClick={handlePerformDeleteFilme} variant="danger" className="min-w-[100px]">
              Excluir Filme
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}