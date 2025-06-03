// src/components/filmes/FilmeForm.tsx
'use client';

import { useState, ChangeEvent, useEffect } from 'react'; // Adicionado useEffect
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { filmeSchema } from '../../schemas/filmeSchema'; //
import { Filme, GeneroFilme, ClassificacaoIndicativa } from '../../interfaces/filme'; //
import { v4 as uuidv4 } from 'uuid';
import { localStorageManager } from '../../lib/localStorageManager'; //
import Button from '../buttons/Button'; //
import Modal from '../modal/Modal'; //

// Definindo FilmeFormData para o formulário, separando o campo de arquivo
interface FilmeFormData extends Omit<Filme, 'id' | 'imagemUrl'> {
  imagemArquivo?: FileList;
}

interface FilmeFormProps {
  onFormSuccess?: () => void;
}

export default function FilmeForm({ onFormSuccess }: FilmeFormProps) {
  const { control, register, handleSubmit, formState: { errors }, reset, watch } = useForm<FilmeFormData>({
    // Ajustar o schema para ser compatível com FilmeFormData, ou validar imagemArquivo separadamente.
    // Para simplificar, o yupResolver aqui pode validar os campos que não são o FileList.
    // A validação de 'imagemArquivo' é feita manualmente no onSubmit.
    resolver: yupResolver(filmeSchema.omit(['imagemUrl'])), // Omitimos imagemUrl do schema Yup aqui,
                                                            // pois o schema espera uma string e o form terá FileList.
                                                            // A validação de imagemUrl (string Base64) é garantida pela lógica.
  });

  const [isModalOpen, setIsModalOpen] = useState(false); //
  const [modalTitle, setModalTitle] = useState(''); //
  const [modalMessage, setModalMessage] = useState(''); //
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);

  const imagemArquivoWatcher = watch('imagemArquivo'); // Renomeado para evitar conflito de nome
  useEffect(() => {
    if (imagemArquivoWatcher && imagemArquivoWatcher[0]) {
      const file = imagemArquivoWatcher[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagemPreview(null);
    }
  }, [imagemArquivoWatcher]);


  const onSubmit = async (data: FilmeFormData) => {
    let imagemBase64 = '';

    if (data.imagemArquivo && data.imagemArquivo[0]) {
      const file = data.imagemArquivo[0];
      // Validação simples de tipo de arquivo (exemplo)
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setModalTitle("Erro de Upload");
        setModalMessage("Tipo de arquivo não permitido. Por favor, selecione uma imagem JPG, PNG ou WebP.");
        setIsModalOpen(true);
        return;
      }
      // Validação simples de tamanho de arquivo (exemplo: 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setModalTitle("Erro de Upload");
        setModalMessage("A imagem é muito grande. O tamanho máximo é 2MB.");
        setIsModalOpen(true);
        return;
      }

      try {
        imagemBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
        });
      } catch (error) {
        console.error("Erro ao converter imagem para Base64:", error);
        setModalTitle("Erro!");
        setModalMessage("Não foi possível processar a imagem. Tente novamente.");
        setIsModalOpen(true);
        return;
      }
    } else {
        setModalTitle("Atenção!");
        setModalMessage("Por favor, selecione uma imagem para o filme.");
        setIsModalOpen(true);
        return;
    }

    // Desestrutura imagemArquivo de 'data' e pega o restante dos dados do formulário
    const { imagemArquivo, ...otherDataFromForm } = data;

    // Cria o objeto Filme final para salvar
    const filmeParaSalvar: Filme = {
      ...otherDataFromForm, // Contém titulo, descricao, genero, etc.
      id: uuidv4(),
      imagemUrl: imagemBase64, // A string Base64 processada
    };
    
    localStorageManager.addFilme(filmeParaSalvar); //

    setModalTitle("Sucesso!"); //
    setModalMessage('Filme salvo com sucesso!'); //
    setIsModalOpen(true); //
    
    reset(); //
    setImagemPreview(null);
  };

  const handleCloseModal = () => {
    const wasSuccess = modalTitle === "Sucesso!"; //
    setIsModalOpen(false); //
    setModalTitle(''); //
    setModalMessage(''); //
    if (wasSuccess && onFormSuccess) { //
      onFormSuccess(); //
    }
  };

  const generos: GeneroFilme[] = [ //
    'Ação', 'Comédia', 'Drama', 'Terror', 'Animação',
    'Ficção Científica', 'Documentário', 'Romance', 'Suspense'
  ];

  const classificacoes: ClassificacaoIndicativa[] = [ //
    'Livre', '10 anos', '12 anos', '14 anos', '16 anos', '18 anos'
  ];

  const commonInputClasses = "w-full border border-[var(--border-color)] rounded-md p-2 shadow-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-[var(--primary-accent)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-text)] opacity-90 focus:opacity-100"; //
  const labelClasses = "block text-sm font-medium text-[var(--muted-text)] mb-1"; //


  return (
    <>
      <form 
        onSubmit={handleSubmit(onSubmit)} //
        className="flex flex-col gap-4 max-w-md mx-auto p-6 border border-[var(--border-color)] rounded-lg shadow-md bg-[var(--card-background)]" //
      >
        <h2 className="text-2xl font-semibold text-[var(--highlight-text)] mb-4 text-center">  {/* */}
          Cadastro de Filme
        </h2>

        {/* Campos do formulário como título, descrição, etc. */}
        <div>
          <label htmlFor="titulo" className={labelClasses}>Título:</label> {/* */}
          <input type="text" id="titulo" {...register("titulo")} className={commonInputClasses}/> {/* */}
          {errors.titulo && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.titulo.message}</span>} {/* */}
        </div>
        <div>
          <label htmlFor="descricao" className={labelClasses}>Descrição:</label> {/* */}
          <textarea id="descricao" {...register("descricao")} className={`${commonInputClasses} min-h-[100px]`}/> {/* */}
          {errors.descricao && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.descricao.message}</span>} {/* */}
        </div>
        <div>
          <label htmlFor="genero" className={labelClasses}>Gênero:</label> {/* */}
          <select id="genero" {...register("genero")} className={commonInputClasses}> {/* */}
            <option value="" style={{ color: 'var(--muted-text)' }}>Selecione um gênero</option> {/* */}
            {generos.map((g) => (<option key={g} value={g} style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>{g}</option>))} {/* */}
          </select>
          {errors.genero && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.genero.message}</span>} {/* */}
        </div>
        <div>
          <label htmlFor="classificacao" className={labelClasses}>Classificação Indicativa:</label> {/* */}
          <select id="classificacao" {...register("classificacao")} className={commonInputClasses}> {/* */}
            <option value="" style={{ color: 'var(--muted-text)' }}>Selecione a classificação</option> {/* */}
            {classificacoes.map((c) => (<option key={c} value={c} style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>{c}</option>))} {/* */}
          </select>
          {errors.classificacao && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.classificacao.message}</span>} {/* */}
        </div>
        <div>
          <label htmlFor="duracao" className={labelClasses}>Duração (minutos):</label> {/* */}
          <input type="number" id="duracao" {...register("duracao", { valueAsNumber: true })} className={commonInputClasses}/> {/* */}
          {errors.duracao && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.duracao.message}</span>} {/* */}
        </div>
        <div>
          <label htmlFor="dataEstreia" className={labelClasses}>Data de Estreia:</label> {/* */}
          <input type="date" id="dataEstreia" {...register("dataEstreia")} className={commonInputClasses}/> {/* */}
          {errors.dataEstreia && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.dataEstreia.message}</span>} {/* */}
        </div>

        {/* Campo de Upload de Imagem com Controller */}
        <div>
          <label htmlFor="imagemArquivo" className={labelClasses}>
            Imagem do Poster:
          </label>
          {/* Usar Controller para inputs não padronizados ou para ter mais controle */}
          <Controller
            name="imagemArquivo"
            control={control}
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <input
                type="file"
                id="imagemArquivo"
                name={name}
                ref={ref}
                onBlur={onBlur}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  onChange(e.target.files); // Passar o FileList para o react-hook-form
                }}
                accept="image/png, image/jpeg, image/webp"
                className={`${commonInputClasses} 
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0
                           file:text-sm file:font-semibold
                           file:bg-[var(--primary-accent)] file:text-[var(--background)]
                           hover:file:bg-[var(--primary-accent-hover)]
                           cursor-pointer`}
              />
            )}
          />
          {/* @ts-ignore */}
          {errors.imagemArquivo && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.imagemArquivo.message}</span>}

          {imagemPreview && (
            <div className="mt-4">
              <p className={labelClasses}>Preview:</p>
              <img src={imagemPreview} alt="Preview do poster" className="max-h-60 w-auto rounded-md border border-[var(--border-color)]" />
            </div>
          )}
        </div>

        <Button type="submit" variant="primary"> {/* */}
          Salvar Filme
        </Button>
      </form>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}> {/* */}
        <div className="text-center p-4"> {/* */}
          <h3 className="text-2xl font-semibold text-[var(--highlight-text)] mb-4"> {/* */}
            {modalTitle} {/* */}
          </h3>
          <p className="text-[var(--foreground)] mb-6">{modalMessage}</p> {/* */}
          <Button onClick={handleCloseModal} variant="primary" className="min-w-[100px]"> {/* */}
            OK
          </Button>
        </div>
      </Modal>
    </>
  );
}