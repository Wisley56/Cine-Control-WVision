'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Ingresso } from '@/interfaces/ingresso';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/components/buttons/Button';
import Loader from '@/components/layout/Loader';
import Modal from '../modal/Modal';
import { api } from '@/services/api';

export default function IngressoForm() {
  const searchParams = useSearchParams();
  const sessaoIdFromUrl = searchParams.get('sessaoId') || '';

  const [formData, setFormData] = useState<Omit<Ingresso, 'id'>>({
    sessaoId: '',
    nomeCliente: '',
    cpf: '',
    assento: '',
    tipoPagamento: 'Cartão',
  });

  const [tituloFilme, setTituloFilme] = useState('');
  const [nomeSala, setNomeSala] = useState('');
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

useEffect(() => {
    if (sessaoIdFromUrl) {
      setLoading(true);
      api.getSessaoById(sessaoIdFromUrl)
        .then(sessao => {
            setTituloFilme(sessao.filme?.titulo || 'Filme não encontrado');
            setNomeSala(sessao.sala?.nome || 'Sala não encontrada');
            setFormData(prev => ({ ...prev, sessaoId: sessaoIdFromUrl }));
        })
        .catch(error => {
            console.error("Sessão não encontrada:", error);
            setTituloFilme('Sessão não encontrada');
            setNomeSala('');
        })
        .finally(() => {
            setLoading(false);
        });
    } else {
      setLoading(false);
      setTituloFilme('Nenhuma sessão selecionada');
      setNomeSala('');
    }
  }, [sessaoIdFromUrl]);

  const handleOpenModal = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalTitle('');
    setModalMessage('');
    if (modalTitle === "Sucesso!") {
        setFormData({
            sessaoId: sessaoIdFromUrl,
            nomeCliente: '',
            cpf: '',
            assento: '',
            tipoPagamento: 'Cartão',
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sessaoId) {
        handleOpenModal("Erro!", "ID da Sessão não encontrado. Não é possível registrar o ingresso.");
        return;
    }
    try {
        await api.createIngresso(formData);
        handleOpenModal("Sucesso!", "Ingresso cadastrado com sucesso!");
    } catch(error) {
        console.error("Erro ao vender ingresso:", error);
        handleOpenModal("Erro!", "Não foi possível realizar a venda.");
    }
  };

  if (loading) {
    return <Loader message="Carregando dados da sessão..." />;
  }

  const labelClasses = "block text-sm font-medium text-[var(--muted-text)] mb-1";
  const commonInputClasses = "w-full border border-[var(--border-color)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-[var(--primary-accent)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-text)] opacity-90 focus:opacity-100";


  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
        <div className="border border-[var(--border-color)] rounded-md p-4 bg-[var(--card-background)] mb-6 space-y-2 shadow-md">
          <p className="text-sm font-medium text-[var(--muted-text)]">
            <strong>Filme:</strong> <span className="text-[var(--foreground)]">{tituloFilme}</span>
          </p>
          <p className="text-sm font-medium text-[var(--muted-text)]">
            <strong>Sala:</strong> <span className="text-[var(--foreground)]">{nomeSala}</span>
          </p>
          <p className="text-sm font-medium text-[var(--muted-text)]">
            <strong>ID da Sessão:</strong> <span className="text-[var(--foreground)]">{formData.sessaoId || sessaoIdFromUrl}</span>
          </p>
        </div>

        <div>
          <label htmlFor="nomeCliente" className={labelClasses}>
            Nome do Cliente
          </label>
          <input
            id="nomeCliente"
            name="nomeCliente"
            placeholder="Nome Completo"
            value={formData.nomeCliente}
            onChange={handleChange}
            required
            className={commonInputClasses}
          />
        </div>

        <div>
          <label htmlFor="cpf" className={labelClasses}>
            CPF
          </label>
          <input
            id="cpf"
            name="cpf"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={handleChange}
            required
            className={commonInputClasses}
          />
        </div>

        <div>
          <label htmlFor="assento" className={labelClasses}>
            Assento
          </label>
          <input
            id="assento"
            name="assento"
            placeholder="Ex: A10"
            value={formData.assento}
            onChange={handleChange}
            required
            className={commonInputClasses}
          />
        </div>

        <div>
          <label htmlFor="tipoPagamento" className={labelClasses}>
            Tipo de Pagamento
          </label>
          <select
            id="tipoPagamento"
            name="tipoPagamento"
            value={formData.tipoPagamento}
            onChange={handleChange}
            required
            className={commonInputClasses}
          >
            <option value="Cartão" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>Cartão</option>
            <option value="Pix" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>Pix</option>
            <option value="Dinheiro" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>Dinheiro</option>
          </select>
        </div>

        <Button type="submit" variant="primary" className="w-full">Confirmar Compra</Button>
      </form>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="text-center p-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-[var(--highlight-text)] mb-4">
            {modalTitle}
          </h3>
          <p className="text-[var(--foreground)] mb-6 text-sm sm:text-base">{modalMessage}</p>
          <Button onClick={handleCloseModal} variant="primary" className="min-w-[100px]">
            OK
          </Button>
        </div>
      </Modal>
    </>
  );
}