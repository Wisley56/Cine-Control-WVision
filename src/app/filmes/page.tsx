'use client';

import { useState } from "react";
import Button from "@/components/buttons/Button";       // Já estilizado
import FilmeForm from "@/components/filmes/FilmeForm";   // Já estilizado
import FilmeList from "@/components/filmes/FilmeList";   // Já estilizado
import Modal from "@/components/modal/Modal";           // Já estilizado

export default function FilmesPage() {
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <div className="p-8 bg-[var(--background)] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4"> {/* Ajustado para melhor responsividade e espaçamento */}
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--primary-accent)] text-center sm:text-left"> {/* Ajustado tamanho e alinhamento */}
            Gerenciar Filmes
          </h1>
          <Button onClick={() => setMostrarModal(true)} variant="primary">
            Novo Filme
          </Button>
        </div>
        <FilmeList />
        <Modal isOpen={mostrarModal} onClose={() => setMostrarModal(false)}>
          {/* Adicionando um título ao Modal para clareza */}
          <h2 className="text-2xl font-semibold text-[var(--highlight-text)] mb-6 text-center">
            Cadastrar Novo Filme
          </h2>
          <FilmeForm />
        </Modal>
      </div>
    </div>
  );
}