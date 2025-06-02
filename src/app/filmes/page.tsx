'use client';

import { useState } from "react";
import Button from "@/components/buttons/Button";
import FilmeForm from "@/components/filmes/FilmeForm";
import FilmeList from "@/components/filmes/FilmeList";
import Modal from "@/components/modal/Modal";

export default function FilmesPage() {
  const [mostrarFormModal, setMostrarFormModal] = useState(false); 
  const [listRefreshKey, setListRefreshKey] = useState(0); 
  const handleOpenFormModal = () => setMostrarFormModal(true);
  const handleCloseFormModal = () => setMostrarFormModal(false);

  const handleFilmeSalvo = () => {
    handleCloseFormModal();
    setListRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="p-8 bg-[var(--background)] min-h-screen"> 
      <div className="max-w-7xl mx-auto"> 
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4"> 
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--primary-accent)] text-center sm:text-left"> 
            Gerenciar Filmes
          </h1>
          <Button onClick={handleOpenFormModal} variant="primary"> 
            Novo Filme
          </Button>
        </div>
        <FilmeList key={listRefreshKey} /> 
        
        <Modal isOpen={mostrarFormModal} onClose={handleCloseFormModal}> 
          <h2 className="text-2xl font-semibold text-[var(--highlight-text)] mb-6 text-center"> 
            Cadastrar Novo Filme
          </h2>
          <FilmeForm onFormSuccess={handleFilmeSalvo} /> 
        </Modal>
      </div>
    </div>
  );
}