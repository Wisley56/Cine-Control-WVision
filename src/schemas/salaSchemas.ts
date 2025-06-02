import * as yup from 'yup';

export const salaSchema = yup.object({
  nome: yup.string()
    .required('Nome é obrigatório')
    .min(2, 'Nome deve ter ao menos 2 caracteres')
    .max(50, 'Nome muito longo'),

  capacidade: yup.number()
    .required('Capacidade é obrigatória')
    .min(1, 'Capacidade deve ser pelo menos 1')
    .max(500, 'Capacidade muito alta'),

  tipo: yup.mixed<'2D' | '3D' | 'IMAX'>()
    .oneOf(['2D', '3D', 'IMAX'], 'Tipo deve ser 2D, 3D ou IMAX')
    .required('Tipo é obrigatório'),
});
