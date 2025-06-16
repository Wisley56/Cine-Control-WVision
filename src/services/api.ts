import { Filme } from "@/interfaces/filme";
import { Sala } from "@/interfaces/sala";
import { Sessao } from "@/interfaces/sessao";
import { Ingresso } from "@/interfaces/ingresso";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Função auxiliar para lidar com as respostas
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Ocorreu um erro na requisição');
  }
  return response.json();
}

// Funções da API
export const api = {
  // --- FILMES ---
  getFilmes: (): Promise<Filme[]> => fetch(`${BASE_URL}/filmes`).then(handleResponse<Filme[]>),
  getFilmeById: (id: string): Promise<Filme> => fetch(`${BASE_URL}/filmes/${id}`).then(handleResponse<Filme>),
  createFilme: (data: Omit<Filme, 'id'>): Promise<Filme> => {
    return fetch(`${BASE_URL}/filmes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse<Filme>);
  },
  deleteFilme: (id: string): Promise<void> => {
    return fetch(`${BASE_URL}/filmes/${id}`, { method: 'DELETE' }).then(handleResponse).then(() => {});
  },

  // --- SALAS ---
  getSalas: (): Promise<Sala[]> => fetch(`${BASE_URL}/salas`).then(handleResponse<Sala[]>),
  createSala: (data: Omit<Sala, 'id'>): Promise<Sala> => {
    return fetch(`${BASE_URL}/salas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse<Sala>);
  },

  // --- SESSOES ---
  getSessoes: (): Promise<Sessao[]> => fetch(`${BASE_URL}/sessoes`).then(handleResponse<Sessao[]>),
  getSessaoById: (id: string): Promise<Sessao> => fetch(`${BASE_URL}/sessoes/${id}`).then(handleResponse<Sessao>),
  createSessao: (data: Omit<Sessao, 'id'>): Promise<Sessao> => {
    return fetch(`${BASE_URL}/sessoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse<Sessao>);
  },
  deleteSessao: (id: string): Promise<void> => {
    return fetch(`${BASE_URL}/sessoes/${id}`, { method: 'DELETE' }).then(handleResponse).then(() => {});
  },

  // --- INGRESSOS ---
   getIngressos: (): Promise<Ingresso[]> => fetch(`${BASE_URL}/ingressos`).then(handleResponse<Ingresso[]>),
  createIngresso: (data: Omit<Ingresso, 'id'>): Promise<Ingresso> => {
    return fetch(`${BASE_URL}/ingressos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse<Ingresso>);
  },
};