'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { filmeSchema } from '../../schemas/filmeSchema'; 
import { Filme, GeneroFilme, ClassificacaoIndicativa } from '../../interfaces/filme'; 
import { v4 as uuidv4 } from 'uuid';
import { localStorageManager } from '../../lib/localStorageManager'; 
import Button from '../buttons/Button'; 
import Modal from '../modal/Modal'; 

interface FilmeFormProps {
  onFormSuccess?: () => void; 
}

export default function FilmeForm({ onFormSuccess }: FilmeFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<Filme, 'id'>>({
    resolver: yupResolver(filmeSchema), 
  });

  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalTitle, setModalTitle] = useState(''); 
  const [modalMessage, setModalMessage] = useState(''); 

  const onSubmit = (data: Omit<Filme, 'id'>) => {
    const filme: Filme = { ...data, id: uuidv4() }; 
    localStorageManager.addFilme(filme); 

    setModalTitle("Sucesso!"); 
    setModalMessage('Filme salvo com sucesso!'); 
    setIsModalOpen(true); 
    
    reset(); 
  };

  const handleCloseModal = () => {
    const wasSuccess = modalTitle === "Sucesso!";
    setIsModalOpen(false); 
    setModalTitle(''); 
    setModalMessage(''); 
    if (wasSuccess && onFormSuccess) {
      onFormSuccess();
    }
  };

  const generos: GeneroFilme[] = [ 
    'Ação', 'Comédia', 'Drama', 'Terror', 'Animação',
    'Ficção Científica', 'Documentário', 'Romance', 'Suspense'
  ];

  const classificacoes: ClassificacaoIndicativa[] = [ 
    'Livre', '10 anos', '12 anos', '14 anos', '16 anos', '18 anos'
  ];

  const commonInputClasses = "w-full border border-[var(--border-color)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-[var(--primary-accent)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-text)] opacity-90 focus:opacity-100"; //
  const labelClasses = "block text-sm font-medium text-[var(--muted-text)] mb-1"; 

  return (
    <>
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex flex-col gap-4 max-w-md mx-auto p-6 border border-[var(--border-color)] rounded-lg shadow-md bg-[var(--card-background)]" //
      >
        <h2 className="text-2xl font-semibold text-[var(--highlight-text)] mb-4 text-center"> 
          Cadastro de Filme
        </h2>

        <div>
          <label htmlFor="titulo" className={labelClasses}>
            Título:
          </label>
          <input
            type="text"
            id="titulo"
            {...register("titulo")} 
            className={commonInputClasses} 
          />
          {errors.titulo && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.titulo.message}</span>} 
        </div>

        <div>
          <label htmlFor="descricao" className={labelClasses}>
            Descrição:
          </label>
          <textarea
            id="descricao"
            {...register("descricao")} 
            className={`${commonInputClasses} min-h-[100px]`} 
          />
          {errors.descricao && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.descricao.message}</span>} 
        </div>

        <div>
          <label htmlFor="genero" className={labelClasses}>
            Gênero:
          </label>
          <select
            id="genero"
            {...register("genero")} 
            className={commonInputClasses} 
          >
            <option value="" style={{ color: 'var(--muted-text)' }}>Selecione um gênero</option> 
            {generos.map((g) => ( 
              <option key={g} value={g} style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>{g}</option> //
            ))}
          </select>
          {errors.genero && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.genero.message}</span>} 
        </div>

        <div>
          <label htmlFor="classificacao" className={labelClasses}>
            Classificação Indicativa:
          </label>
          <select
            id="classificacao"
            {...register("classificacao")} 
            className={commonInputClasses} 
          >
            <option value="" style={{ color: 'var(--muted-text)' }}>Selecione a classificação</option> 
            {classificacoes.map((c) => ( 
              <option key={c} value={c} style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>{c}</option> //
            ))}
          </select>
          {errors.classificacao && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.classificacao.message}</span>} 
        </div>

        <div>
          <label htmlFor="duracao" className={labelClasses}>
            Duração (minutos):
          </label>
          <input
            type="number"
            id="duracao"
            {...register("duracao", { valueAsNumber: true })} 
            className={commonInputClasses} 
          />
          {errors.duracao && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.duracao.message}</span>} 
        </div>

        <div>
          <label htmlFor="dataEstreia" className={labelClasses}>
            Data de Estreia:
          </label>
          <input
            type="date"
            id="dataEstreia"
            {...register("dataEstreia")} 
            className={commonInputClasses} 
          />
          {errors.dataEstreia && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.dataEstreia.message}</span>}
        </div>

        <div>
          <label htmlFor="imagemUrl" className={labelClasses}>
            URL da Imagem:
          </label>
          <input
            type="url"
            id="imagemUrl"
            {...register("imagemUrl")} 
            className={commonInputClasses}
          />
          {errors.imagemUrl && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.imagemUrl.message}</span>}
        </div>

        <Button type="submit" variant="primary">
          Salvar Filme
        </Button>
      </form>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="text-center p-4">
          <h3 className="text-2xl font-semibold text-[var(--highlight-text)] mb-4">
            {modalTitle}
          </h3>
          <p className="text-[var(--foreground)] mb-6">{modalMessage}</p> 
          <Button onClick={handleCloseModal} variant="primary" className="min-w-[100px]">
            OK
          </Button>
        </div>
      </Modal>
    </>
  );
}