"use client";

import SessaoForm from "@/components/sessoes/SessaoForm";

export default function CadastroSessoesPage() {

  const handleSessaoSalvaCallback = () => {
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-8 sm:py-12 px-4 flex flex-col justify-start sm:justify-center items-center">
      <div className="max-w-xl w-full space-y-6 sm:space-y-8">
        <div>
          <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--primary-accent)]">
            Cadastrar Nova Sessão
          </h2>
          <p className="mt-2 text-center text-xs sm:text-sm text-[var(--muted-text)]">
            Preencha os dados abaixo para adicionar uma nova sessão de filme.
          </p>
        </div>
        <SessaoForm onSave={handleSessaoSalvaCallback} />
      </div>
    </div>
  );
}