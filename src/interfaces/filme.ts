export type GeneroFilme = 
  | 'Ação'
  | 'Comédia'
  | 'Drama'
  | 'Terror'
  | 'Animação'
  | 'Ficção Científica'
  | 'Documentário'
  | 'Romance'
  | 'Suspense';

export type ClassificacaoIndicativa =
  | 'Livre'
  | '10 anos'
  | '12 anos'
  | '14 anos'
  | '16 anos'
  | '18 anos';

export interface Filme {
  id: string;
  titulo: string;
  descricao: string;
  genero: GeneroFilme;
  classificacao: ClassificacaoIndicativa;
  duracao: number; 
  dataEstreia: string; 
  imagemUrl: string;
}
