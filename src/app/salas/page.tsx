"use client"
import Button from '@/components/buttons/Button';     // Já estilizado
import Modal from '@/components/modal/Modal';         // Já estilizado
import SalaForm from '@/components/salas/SalaForm';   // Já estilizado
import SalaList from '@/components/salas/SalaList';   // Já estilizado
import { useState } from 'react';

export default function SalasPage() {
  const [mostrarModal, setMostrarModal] = useState(false);
  return (
    <main className="min-h-screen bg-[var(--background)] p-8"> {/* Corrigido: bg-[var(--background)] */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--primary-accent)] text-center sm:text-left">
            Gerenciar Salas
          </h1>
          <Button onClick={() => setMostrarModal(true)} variant="primary">
            Nova Sala
          </Button>
        </div>
        <SalaList />
        <Modal isOpen={mostrarModal} onClose={() => setMostrarModal(false)}>
          <h2 className="text-2xl font-semibold text-[var(--highlight-text)] mb-6 text-center">
            Cadastro de Nova Sala
          </h2>
          <SalaForm />
        </Modal>
      </div>
    </main>
  );
}