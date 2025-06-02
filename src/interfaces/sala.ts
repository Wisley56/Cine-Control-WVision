export interface Sala {
  id: string;
  nome: string;
  capacidade: number;
  tipo: '2D' | '3D' | 'IMAX';
}
