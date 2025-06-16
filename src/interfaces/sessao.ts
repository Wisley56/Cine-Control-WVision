import { Filme } from "./filme";
import { Sala } from "./sala";

export interface Sessao {
  id: string;
  filmeId: string;
  salaId: string;
  dataHora: string;               
  preco: number;
  idioma: 'Dublado' | 'Legendado'; 
  formato: '2D' | '3D';

  filme?: Filme;
  sala?: Sala;
}
