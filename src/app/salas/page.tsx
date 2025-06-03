"use client"
import { useState } from 'react';
import Button from '@/components/buttons/Button';
import Modal from '@/components/modal/Modal';
import SalaForm from '@/components/salas/SalaForm';
import SalaList from '@/components/salas/SalaList';

export default function SalasPage() {
  const [mostrarFormModal, setMostrarFormModal] = useState(false);
  const [listRefreshKey, setListRefreshKey] = useState(0);

  const handleOpenFormModal = () => setMostrarFormModal(true);
  const handleCloseFormModal = () => setMostrarFormModal(false);

  const handleSalaSalva = () => {
    handleCloseFormModal();
    setListRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col xs:flex-row justify-between items-center mb-8 sm:mb-10 gap-3 xs:gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--primary-accent)] text-center xs:text-left">
            Gerenciar Salas
          </h1>
          <Button onClick={handleOpenFormModal} variant="primary" className="w-auto">
            Nova Sala
          </Button>
        </div>
        <SalaList key={listRefreshKey} />
      </div>

      <Modal isOpen={mostrarFormModal} onClose={handleCloseFormModal}>
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--highlight-text)] mb-5 sm:mb-6 text-center">
          Cadastro de Nova Sala
        </h2>
        <SalaForm onFormSuccess={handleSalaSalva} />
      </Modal>
    </main>
  );
}