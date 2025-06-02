'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { salaSchema } from '../../schemas/salaSchemas'; 
import { Sala } from '../../interfaces/sala';
import { v4 as uuidv4 } from 'uuid';
import { localStorageManager } from '../../lib/localStorageManager';
import Button from '../buttons/Button'; 

export default function SalaForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<Sala, 'id'>>({
    resolver: yupResolver(salaSchema),
  });

  const onSubmit = (data: Omit<Sala, 'id'>) => {
    const novaSala: Sala = { ...data, id: uuidv4() };
    localStorageManager.addSala(novaSala);
    alert('Sala salva com sucesso!');
    reset();
  };

  const tipos = ['2D', '3D', 'IMAX'] as const;

  const commonInputClasses = "border border-[var(--border-color)] rounded-md px-3 py-2 w-full bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-text)] opacity-90 focus:opacity-100 shadow-sm focus:ring-2 focus:ring-[var(--primary-accent)] focus:border-[var(--primary-accent)]";
  const labelClasses = "block text-sm font-medium text-[var(--muted-text)] mb-1";

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col gap-5 max-w-md mx-auto p-6 border border-[var(--border-color)] rounded-lg shadow-md bg-[var(--card-background)]"
    >
      <h2 className="text-xl font-bold text-[var(--highlight-text)] mb-2 text-center"> 
        Cadastro de Sala
      </h2>

      <div>
        <label htmlFor="nome" className={labelClasses}>Nome da Sala:</label>
        <input 
          type="text" 
          id="nome"
          {...register('nome')} 
          className={commonInputClasses} 
        />
        {errors.nome && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.nome.message}</span>} 
      </div>

      <div>
        <label htmlFor="capacidade" className={labelClasses}>Capacidade:</label>
        <input 
          type="number" 
          id="capacidade"
          {...register('capacidade', { valueAsNumber: true })} 
          className={commonInputClasses} 
        />
        {errors.capacidade && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.capacidade.message}</span>}
      </div>

      <div>
        <label htmlFor="tipo" className={labelClasses}>Tipo:</label>
        <select 
          id="tipo"
          {...register('tipo')} 
          className={commonInputClasses}
        >
          <option value="" style={{ color: 'var(--muted-text)' }}>Selecione um tipo</option>
          {tipos.map(tipo => (
            <option key={tipo} value={tipo} style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>{tipo}</option>
          ))}
        </select>
        {errors.tipo && <span className="text-[var(--danger-accent)] text-xs mt-1">{errors.tipo.message}</span>}
      </div>

      <Button type="submit" variant="primary">Salvar Sala</Button>
    </form>
  );
}