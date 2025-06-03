'use client';

import { useEffect, useState } from 'react';
import { Sessao } from '../../interfaces/sessao';
import { Filme } from '../../interfaces/filme';
import { Sala } from '../../interfaces/sala';
import { localStorageManager } from '../../lib/localStorageManager';
import Loader from '../layout/Loader';
import Button from '../buttons/Button';
import Link from 'next/link';
import Modal from '../modal/Modal';

export default function SessaoList() {
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [loading, setLoading] = useState(true);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    const sessoesSalvas = localStorageManager.getSessoes();
    const filmesSalvos = localStorageManager.getFilmes();
    const salasSalvas = localStorageManager.getSalas();

    setSessoes(sessoesSalvas);
    setFilmes(filmesSalvos);
    setSalas(salasSalvas);
    setLoading(false);
  };

  const handleOpenConfirmModal = (id: string) => {
    setItemIdToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setItemIdToDelete(null);
  };

  const handlePerformDelete = () => {
    if (itemIdToDelete) {
      localStorageManager.deleteSessao(itemIdToDelete);
      carregarDados();
    }
    handleCloseConfirmModal();
  };

  const getFilmeTitulo = (filmeId: string) => {
    const filme = filmes.find((f) => f.id === filmeId);
    return filme ? filme.titulo : 'Filme não encontrado';
  };

  const getSalaNome = (salaId: string) => {
    const sala = salas.find((s) => s.id === salaId);
    return sala ? sala.nome : 'Sala não encontrada';
  };

  if (loading) {
    return <Loader message="Carregando sessões..." />;
  }

  if (sessoes.length === 0) {
    return (
        <div className="text-center py-10 bg-[var(--background)] min-h-[calc(100vh-var(--navbar-height,80px))] flex flex-col justify-center items-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--primary-accent)] mb-6 sm:mb-8">
                Sessões Disponíveis
            </h1>
            <p className="text-lg sm:text-xl text-[var(--muted-text)]">Nenhuma sessão cadastrada no momento.</p>
            <Link href="/cadastro-sessoes" className="mt-6 inline-block">
                <Button variant="primary">Cadastrar Nova Sessão</Button>
            </Link>
        </div>
    );
  }

  return (
    <>
      <div className="bg-[var(--background)] min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
          <h1 className="text-center mb-8 sm:mb-12 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--primary-accent)]">
            Sessões Disponíveis
          </h1>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sessoes.map((sessao) => (
              <div
                key={sessao.id}
                className="group flex flex-col bg-[var(--card-background)] rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out border border-[var(--border-color)] overflow-hidden"
              >
                <div className="p-5 sm:p-6 flex-grow">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[var(--highlight-text)] mb-4 group-hover:text-[var(--primary-accent)] transition-colors duration-300">
                    {getFilmeTitulo(sessao.filmeId)}
                  </h3>
                  <div className="space-y-2 text-sm text-[var(--muted-text)]">
                      <p><strong className="font-medium text-[var(--foreground)]">Sala:</strong> {getSalaNome(sessao.salaId)}</p>
                      <p><strong className="font-medium text-[var(--foreground)]">Data:</strong> {new Date(sessao.dataHora).toLocaleDateString()}</p>
                      <p><strong className="font-medium text-[var(--foreground)]">Horário:</strong> {new Date(sessao.dataHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      <p><strong className="font-medium text-[var(--foreground)]">Preço:</strong> R$ {sessao.preco.toFixed(2)}</p>
                      <p><strong className="font-medium text-[var(--foreground)]">Idioma:</strong> {sessao.idioma}</p>
                      <p><strong className="font-medium text-[var(--foreground)]">Formato:</strong> {sessao.formato}</p>
                  </div>
                </div>

                <div className="p-4 bg-[var(--background)] bg-opacity-50 border-t border-[var(--border-color)]">
                  <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <Link href={`/venda-ingressos?sessaoId=${sessao.id}`} className="w-full sm:w-auto">
                      <Button variant='primary' className="w-full">
                        Comprar Ingresso
                      </Button>
                    </Link>
                    <Button variant="danger" onClick={() => handleOpenConfirmModal(sessao.id)} className="w-full sm:w-auto">
                      Excluir
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={isConfirmModalOpen} onClose={handleCloseConfirmModal}>
        <div className="text-center p-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-[var(--highlight-text)] mb-4">
            Confirmar Exclusão
          </h3>
          <p className="text-[var(--foreground)] mb-6 text-sm sm:text-base">
            Tem certeza que deseja excluir esta sessão? Esta ação não pode ser desfeita.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button onClick={handleCloseConfirmModal} variant="secondary" className="min-w-[100px] w-full sm:w-auto">
              Cancelar
            </Button>
            <Button onClick={handlePerformDelete} variant="danger" className="min-w-[100px] w-full sm:w-auto">
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}