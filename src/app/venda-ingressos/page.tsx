'use client';

import IngressoForm from '@/components/ingressos/IngressosForm';

export default function VendaIngressosPage() {
  return (
    <div className="flex justify-center items-start sm:items-center min-h-screen bg-[var(--background)] py-8 sm:py-12 px-4">
      <div className="bg-[var(--card-background)] shadow-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-lg border border-[var(--border-color)]">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center text-[var(--primary-accent)]">
          Venda de Ingressos
        </h1>
        <p className="mb-6 sm:mb-8 text-xs sm:text-sm text-[var(--muted-text)] text-center">
          Preencha os dados abaixo para realizar a venda de ingressos.
        </p>
        <IngressoForm />
      </div>
    </div>
  );
}