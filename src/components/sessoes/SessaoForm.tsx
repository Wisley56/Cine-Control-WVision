'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { Sessao } from '@/interfaces/sessao'; 
import { localStorageManager } from '@/lib/localStorageManager'; 
import { v4 as uuidv4 } from 'uuid';
import Button from '../buttons/Button'; 
import { Sala } from '@/interfaces/sala'; 
import { Filme } from '@/interfaces/filme'; 
import Loader from '@/components/layout/Loader'; 
import Modal from '../modal/Modal';  

interface SessaoFormProps {
  onSave?: () => void; 
}

export default function SessaoForm({ onSave }: SessaoFormProps) {
  const router = useRouter();  
  const [filmeId, setFilmeId] = useState(''); 
  const [salaId, setSalaId] = useState(''); 
  const [dataHora, setDataHora] = useState(''); 
  const [preco, setPreco] = useState(0); 
  const [idioma, setIdioma] = useState<'Dublado' | 'Legendado'>('Dublado'); 
  const [formato, setFormato] = useState<'2D' | '3D'>('2D'); 

  const [filmes, setFilmes] = useState<Filme[]>([]); 
  const [salas, setSalas] = useState<Sala[]>([]); 
  const [loading, setLoading] = useState(true); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    setLoading(true); 
    setFilmes(localStorageManager.getFilmes()); 
    setSalas(localStorageManager.getSalas()); 
    setLoading(false); 
  }, []);

  const resetFormFields = () => {
    setFilmeId(''); 
    setSalaId(''); 
    setDataHora(''); 
    setPreco(0); 
    setIdioma('Dublado'); 
    setFormato('2D'); 
  };

  const handleOpenModal = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    const wasSuccess = modalTitle === "Sucesso!";
    setIsModalOpen(false);
    setModalTitle('');
    setModalMessage('');

    if (wasSuccess) {
      resetFormFields();
      if (onSave) { 
        onSave();
      }
      router.push('/sessoes'); 
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!filmeId || !salaId || !dataHora || preco <= 0) { 
        handleOpenModal("Atenção!", "Por favor, preencha todos os campos obrigatórios e defina um preço válido.");
        return; 
    }

    const novaSessao: Sessao = { 
      id: uuidv4(), 
      filmeId, 
      salaId, 
      dataHora, 
      preco, 
      idioma, 
      formato 
    };

    localStorageManager.addSessao(novaSessao); 
    handleOpenModal("Sucesso!", "Sessão salva com sucesso! Você será redirecionado.");
  };

  if (loading) { 
    return <Loader message="Carregando filmes e salas..." />; 
  }

  const labelClasses = "block text-sm font-medium text-[var(--muted-text)] mb-1"; 
  const commonInputClasses = "w-full border border-[var(--border-color)] rounded-md p-2 shadow-sm bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-text)] opacity-90 focus:opacity-100 focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-[var(--primary-accent)]"; 

  return (
    <>
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-5 max-w-lg mx-auto p-6 border border-[var(--border-color)] rounded-lg shadow-md bg-[var(--card-background)]" 
      >
        <h2 className="text-xl font-bold text-[var(--highlight-text)] mb-6 text-center">Cadastrar Nova Sessão</h2> 
        
        <div>
          <label htmlFor="filmeId" className={labelClasses}>Filme</label> 
          <select
            id="filmeId"
            value={filmeId} 
            onChange={(e) => setFilmeId(e.target.value)} 
            required 
            className={commonInputClasses} 
          >
            <option value="" style={{ color: 'var(--muted-text)' }}>Selecione um filme</option> 
            {filmes.map((f) => ( 
              <option key={f.id} value={f.id} style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}> 
                {f.titulo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="salaId" className={labelClasses}>Sala</label> 
          <select
            id="salaId"
            value={salaId} 
            onChange={(e) => setSalaId(e.target.value)} 
            required 
            className={commonInputClasses} 
          >
            <option value="" style={{ color: 'var(--muted-text)' }}>Selecione uma sala</option> 
            {salas.map((s) => ( 
              <option key={s.id} value={s.id} style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}> 
                {s.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dataHora" className={labelClasses}>Data e Hora</label> 
          <input
            id="dataHora"
            type="datetime-local"
            value={dataHora} 
            onChange={(e) => setDataHora(e.target.value)} 
            required 
            className={commonInputClasses} 
          />
        </div>

        <div>
          <label htmlFor="preco" className={labelClasses}>Preço (R$)</label> 
          <input
            id="preco"
            type="number"
            value={preco} 
            onChange={(e) => setPreco(Number(e.target.value))} 
            required 
            min="0.01" 
            step="0.01" 
            className={commonInputClasses} 
          />
        </div>

        <div>
          <label htmlFor="idioma" className={labelClasses}>Idioma</label> 
          <select
            id="idioma"
            value={idioma} 
            onChange={(e) => setIdioma(e.target.value as 'Dublado' | 'Legendado')} 
            required 
            className={commonInputClasses} 
          >
            <option value="Dublado" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>Dublado</option> 
            <option value="Legendado" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>Legendado</option> 
          </select>
        </div>

        <div>
          <label htmlFor="formato" className={labelClasses}>Formato</label> 
          <select
            id="formato"
            value={formato} 
            onChange={(e) => setFormato(e.target.value as '2D' | '3D')} 
            required 
            className={commonInputClasses} 
          >
            <option value="2D" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>2D</option> 
            <option value="3D" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>3D</option> 
          </select>
        </div>

        <Button type="submit" variant="primary"> 
          Salvar Sessão
        </Button>
      </form>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="text-center p-4">
          <h3 className="text-2xl font-semibold text-[var(--highlight-text)] mb-4">
            {modalTitle}
          </h3>
          <p className="text-[var(--foreground)] mb-6">{modalMessage}</p>
          <Button onClick={handleCloseModal} variant="primary" className="min-w-[100px]">
            OK
          </Button>
        </div>
      </Modal>
    </>
  );
}