import * as yup from 'yup';
import { GeneroFilme, ClassificacaoIndicativa } from '../interfaces/filme';

export const filmeSchema = yup.object({
  titulo: yup.string().required("Título obrigatório"),
  descricao: yup.string().required("Descrição obrigatória"),
  genero: yup.mixed<GeneroFilme>().oneOf([
    'Ação', 'Comédia', 'Drama', 'Terror', 'Animação', 
    'Ficção Científica', 'Documentário', 'Romance', 'Suspense'
  ]).required("Gênero obrigatório"),
  classificacao: yup.mixed<ClassificacaoIndicativa>().oneOf([
    'Livre', '10 anos', '12 anos', '14 anos', '16 anos', '18 anos'
  ]).required("Classificação obrigatória"),
  duracao: yup.number().positive().integer().required("Duração obrigatória"),
  dataEstreia: yup.string().required("Data de estreia obrigatória"),
  imagemUrl: yup.string().url().required("URL da imagem obrigatória")
});
