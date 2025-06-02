export interface Ingresso {
  id: string;
  sessaoId: string;
  nomeCliente: string;
  cpf: string;
  assento: string;
  tipoPagamento: 'Cartão' | 'Pix' | 'Dinheiro';
}
