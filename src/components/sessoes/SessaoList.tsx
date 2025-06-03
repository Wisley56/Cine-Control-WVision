// src/components/sessoes/SessaoList.tsx
'use client';

import { useEffect, useState } from 'react';
import { Sessao } from '../../interfaces/sessao'; //
import { Filme } from '../../interfaces/filme'; //
import { Sala } from '../../interfaces/sala'; //
import { localStorageManager } from '../../lib/localStorageManager'; //
import Loader from '../layout/Loader'; //
import Button from '../buttons/Button'; //
import Link from 'next/link';
import Modal from '../modal/Modal'; // 1. Importar o Modal

export default function SessaoList() {
  const [sessoes, setSessoes] = useState<Sessao[]>([]); //
  const [filmes, setFilmes] = useState<Filme[]>([]); //
  const [salas, setSalas] = useState<Sala[]>([]); //
  const [loading, setLoading] = useState(true); //

  // 2. Estados para o modal de confirmação de exclusão
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    carregarDados(); //
  }, []);

  const carregarDados = () => {
    const sessoesSalvas = localStorageManager.getSessoes(); //
    const filmesSalvos = localStorageManager.getFilmes(); //
    const salasSalvas = localStorageManager.getSalas(); //

    setSessoes(sessoesSalvas); //
    setFilmes(filmesSalvos); //
    setSalas(salasSalvas); //
    setLoading(false); //
  };

  // 3. Função para abrir o modal de confirmação
  const handleOpenConfirmModal = (id: string) => {
    setItemIdToDelete(id);
    setIsConfirmModalOpen(true);
  };

  // 4. Função para fechar o modal de confirmação
  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setItemIdToDelete(null);
  };

  // 5. Função para executar a exclusão
  const handlePerformDelete = () => {
    if (itemIdToDelete) {
      localStorageManager.deleteSessao(itemIdToDelete); //
      carregarDados(); // Recarrega os dados para atualizar a lista na tela //
    }
    handleCloseConfirmModal(); // Fecha o modal após a exclusão
  };

  // A função excluirSessao original que usava confirm() não é mais diretamente chamada pelo botão.
  // Em vez disso, o botão "Excluir" agora chama handleOpenConfirmModal.
  // A lógica de exclusão real está em handlePerformDelete.

  const getFilmeTitulo = (filmeId: string) => {
    const filme = filmes.find((f) => f.id === filmeId); //
    return filme ? filme.titulo : 'Filme não encontrado'; //
  };

  const getSalaNome = (salaId: string) => {
    const sala = salas.find((s) => s.id === salaId); //
    return sala ? sala.nome : 'Sala não encontrada'; //
  };

  if (loading) { //
    return <Loader message="Carregando sessões..." />; //
  }

  if (sessoes.length === 0) { //
    return (
        <div className="text-center py-10 bg-[var(--background)] min-h-[calc(100vh-var(--navbar-height,80px))] flex flex-col justify-center items-center"> {/* */}
            <h1 className="text-4xl font-bold text-[var(--primary-accent)] mb-8"> {/* */}
                Sessões Disponíveis
            </h1>
            <p className="text-xl text-[var(--muted-text)]">Nenhuma sessão cadastrada no momento.</p> {/* */}
            <Link href="/cadastro-sessoes" className="mt-6 inline-block"> {/* */}
                <Button variant="primary">Cadastrar Nova Sessão</Button> {/* */}
            </Link>
        </div>
    );
  }

  return (
    <> {/* Envolver em Fragment para permitir o Modal como irmão da div principal */}
      <div className="bg-[var(--background)] min-h-screen"> {/* */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"> {/* */}
          <h1 className="text-center mb-12 text-4xl font-bold tracking-tight text-[var(--primary-accent)] sm:text-5xl"> {/* */}
            Sessões Disponíveis
          </h1>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"> {/* */}
            {sessoes.map((sessao) => ( //
              <div
                key={sessao.id} //
                className="group flex flex-col bg-[var(--card-background)] rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out border border-[var(--border-color)] overflow-hidden" //
              >
                <div className="p-6 flex-grow"> {/* */}
                  <h3 className="text-2xl font-semibold text-[var(--highlight-text)] mb-4 group-hover:text-[var(--primary-accent)] transition-colors duration-300"> {/* */}
                    {getFilmeTitulo(sessao.filmeId)} {/* */}
                  </h3>
                  <div className="space-y-2 text-sm text-[var(--muted-text)]"> {/* */}
                      <p><strong className="font-medium text-[var(--foreground)]">Sala:</strong> {getSalaNome(sessao.salaId)}</p> {/* */}
                      <p><strong className="font-medium text-[var(--foreground)]">Data:</strong> {new Date(sessao.dataHora).toLocaleDateString()}</p> {/* */}
                      <p><strong className="font-medium text-[var(--foreground)]">Horário:</strong> {new Date(sessao.dataHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p> {/* */}
                      <p><strong className="font-medium text-[var(--foreground)]">Preço:</strong> R$ {sessao.preco.toFixed(2)}</p> {/* */}
                      <p><strong className="font-medium text-[var(--foreground)]">Idioma:</strong> {sessao.idioma}</p> {/* */}
                      <p><strong className="font-medium text-[var(--foreground)]">Formato:</strong> {sessao.formato}</p> {/* */}
                  </div>
                </div>
                
                <div className="p-4 bg-[var(--background)] bg-opacity-50 border-t border-[var(--border-color)]"> {/* */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-end"> {/* */}
                    <Link href={`/venda-ingressos?sessaoId=${sessao.id}`} className="w-full sm:w-auto"> {/* */}
                      <Button variant='primary' className="w-full"> {/* */}
                        Comprar Ingresso
                      </Button>
                    </Link>
                    {/* 6. Botão de Excluir agora abre o modal de confirmação */}
                    <Button variant="danger" onClick={() => handleOpenConfirmModal(sessao.id)} className="w-full sm:w-auto">  {/* */}
                      Excluir
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. Adicionar o Modal de Confirmação ao JSX */}
      <Modal isOpen={isConfirmModalOpen} onClose={handleCloseConfirmModal}>
        <div className="text-center p-4">
          <h3 className="text-2xl font-semibold text-[var(--highlight-text)] mb-4">
            Confirmar Exclusão
          </h3>
          <p className="text-[var(--foreground)] mb-6">
            Tem certeza que deseja excluir esta sessão? Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={handleCloseConfirmModal} variant="secondary" className="min-w-[100px]">
              Cancelar
            </Button>
            <Button onClick={handlePerformDelete} variant="danger" className="min-w-[100px]">
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}