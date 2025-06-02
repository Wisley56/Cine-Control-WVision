'use client';

import IngressoForm from '@/components/ingressos/IngressosForm';

export default function VendaIngressosPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-[var(--card-background)] shadow-xl rounded-2xl p-8 w-full max-w-lg border border-[var(--border-color)]">
        <h1 className="text-3xl font-bold mb-4 text-center text-[var(--primary-accent)]">
          Venda de Ingressos
        </h1>
        <p className="mb-8 text-sm text-[var(--muted-text)] text-center"> 
          Preencha os dados abaixo para realizar a venda de ingressos.
        </p>
        <IngressoForm />
      </div>
    </div>
  );
}