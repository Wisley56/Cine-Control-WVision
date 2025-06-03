'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { salaSchema } from '../../schemas/salaSchemas';
import { Sala } from '../../interfaces/sala';
import { v4 as uuidv4 } from 'uuid';
import { localStorageManager } from '../../lib/localStorageManager';
import Button from '../buttons/Button';
import Modal from '../modal/Modal';

interface SalaFormProps {
  onFormSuccess?: () => void;
}

export default function SalaForm({ onFormSuccess }: SalaFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<Sala, 'id'>>({
    resolver: yupResolver(salaSchema),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const onSubmit = (data: Omit<Sala, 'id'>) => {
    const novaSala: Sala = { ...data, id: uuidv4() };
    localStorageManager.addSala(novaSala);

    setModalTitle("Sucesso!");
    setModalMessage('Sala salva com sucesso!');
    setIsModalOpen(true);

    reset();
  };

  const handleCloseModal = () => {
    const wasSuccess = modalTitle === "Sucesso!";
    setIsModalOpen(false);
    setModalTitle('');
    setModalMessage('');
    if (wasSuccess && onFormSuccess) {
      onFormSuccess();
    }
  };

  const tipos = ['2D', '3D', 'IMAX'] as const;

  const commonInputClasses = "border border-[var(--border-color)] rounded-md px-3 py-2 w-full bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-text)] opacity-90 focus:opacity-100 shadow-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-[var(--primary-accent)]";
  const labelClasses = "block text-sm font-medium text-[var(--muted-text)] mb-1";

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 max-w-md mx-auto p-4 sm:p-0"
      >
        <div>
          <label htmlFor="nome" className={labelClasses}>Nome da Sala:</label>
          <input
            type="text"
            id="nome"
            {...register('nome')}
            className={commonInputClasses}
            placeholder="Ex: Sala 1, Sala VIP"
          />
          {errors.nome && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.nome.message}</span>}
        </div>

        <div>
          <label htmlFor="capacidade" className={labelClasses}>Capacidade:</label>
          <input
            type="number"
            id="capacidade"
            {...register('capacidade', { valueAsNumber: true })}
            className={commonInputClasses}
            placeholder="Ex: 120"
          />
          {errors.capacidade && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.capacidade.message}</span>}
        </div>

        <div>
          <label htmlFor="tipo" className={labelClasses}>Tipo:</label>
          <select
            id="tipo"
            {...register('tipo')}
            className={commonInputClasses}
          >
            <option value="" style={{ color: 'var(--muted-text)' }}>Selecione um tipo</option>
            {tipos.map(tipo => (
              <option key={tipo} value={tipo} style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>{tipo}</option>
            ))}
          </select>
          {errors.tipo && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.tipo.message}</span>}
        </div>

        <Button type="submit" variant="primary" className="w-full mt-2">Salvar Sala</Button>
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