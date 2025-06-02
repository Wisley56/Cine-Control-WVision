"use client";

import SessaoForm from "@/components/sessoes/SessaoForm"; //

export default function CadastroSessoesPage() {

  const handleSessaoSalvaCallback = () => {
    console.log("Callback onSave da CadastroSessoesPage foi chamado.");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center"> 
      <div className="max-w-3xl w-full space-y-8"> 
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-[var(--primary-accent)]"> 
            Cadastrar Nova Sessão
          </h2>
          <p className="mt-2 text-center text-sm text-[var(--muted-text)]"> 
            Preencha os dados abaixo para adicionar uma nova sessão de filme.
          </p>
        </div>
        <div className="bg-[var(--card-background)] p-8 shadow-xl rounded-lg border border-[var(--border-color)]"> 
          <SessaoForm onSave={handleSessaoSalvaCallback} />
        </div>
      </div>
    </div>
  );
}