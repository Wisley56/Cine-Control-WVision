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
    <div className="bg-[var(--background)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col xs:flex-row justify-between items-center mb-8 sm:mb-10 gap-3 xs:gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--primary-accent)] text-center xs:text-left">
            Gerenciar Filmes
          </h1>
          <Button onClick={handleOpenFormModal} variant="primary" className="w-auto">
            Novo Filme
          </Button>
        </div>
        <FilmeList key={listRefreshKey} />
      </div>

      <Modal isOpen={mostrarFormModal} onClose={handleCloseFormModal}>
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--highlight-text)] mb-5 sm:mb-6 text-center">
          Cadastrar Novo Filme
        </h2>
        <FilmeForm onFormSuccess={handleFilmeSalvo} />
      </Modal>
    </div>
  );
}