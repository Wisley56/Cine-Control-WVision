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
    <main className="min-h-screen bg-[var(--background)] p-8"> 
      <div className="max-w-7xl mx-auto"> 
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4"> 
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--primary-accent)] text-center sm:text-left"> 
            Gerenciar Salas
          </h1>
          <Button onClick={handleOpenFormModal} variant="primary"> 
            Nova Sala
          </Button>
        </div>
        <SalaList key={listRefreshKey} /> 
        <Modal isOpen={mostrarFormModal} onClose={handleCloseFormModal}> 
          <h2 className="text-2xl font-semibold text-[var(--highlight-text)] mb-6 text-center"> 
            Cadastro de Nova Sala
          </h2>
          <SalaForm onFormSuccess={handleSalaSalva} /> 
        </Modal>
      </div>
    </main>
  );
}