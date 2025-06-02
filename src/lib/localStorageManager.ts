import { Filme } from '../interfaces/filme';
import { Sala } from '../interfaces/sala';
import { Sessao } from '../interfaces/sessao';
import { Ingresso } from '../interfaces/ingresso';

type Entity = Filme | Sala | Sessao | Ingresso;

function getStorageKey<T extends Entity>(entityName: string) {
  return entityName.toLowerCase() + 's'; 
}

function getAll<T extends Entity>(entityName: string): T[] {
  const key = getStorageKey<T>(entityName);
  if (typeof window === 'undefined') return []; 
  const json = localStorage.getItem(key);
  if (!json) return [];
  try {
    return JSON.parse(json) as T[];
  } catch {
    return [];
  }
}

function saveAll<T extends Entity>(entityName: string, items: T[]) {
  const key = getStorageKey<T>(entityName);
  localStorage.setItem(key, JSON.stringify(items));
}

export const localStorageManager = {
  // --- FILME ---
  getFilmes(): Filme[] {
    return getAll<Filme>('filme');
  },

  addFilme(filme: Filme) {
    const filmes = this.getFilmes();
    filmes.push(filme);
    saveAll('filme', filmes);
  },

  updateFilme(updated: Filme) {
    let filmes = this.getFilmes();
    filmes = filmes.map((f) => (f.id === updated.id ? updated : f));
    saveAll('filme', filmes);
  },

  deleteFilme(id: string) {
    let filmes = this.getFilmes();
    filmes = filmes.filter((f) => f.id !== id);
    saveAll('filme', filmes);
  },

  // --- SALA ---
  getSalas(): Sala[] {
    return getAll<Sala>('sala');
  },

  addSala(sala: Sala) {
    const salas = this.getSalas();
    salas.push(sala);
    saveAll('sala', salas);
  },

  updateSala(updated: Sala) {
    let salas = this.getSalas();
    salas = salas.map((s) => (s.id === updated.id ? updated : s));
    saveAll('sala', salas);
  },

  deleteSala(id: string) {
    let salas = this.getSalas();
    salas = salas.filter((s) => s.id !== id);
    saveAll('sala', salas);
  },

  // --- SESSAO ---
  getSessoes(): Sessao[] {
    return getAll<Sessao>('sessao');
  },

  addSessao(sessao: Sessao) {
    const sessoes = this.getSessoes();
    sessoes.push(sessao);
    saveAll('sessao', sessoes);
  },

  updateSessao(updated: Sessao) {
    let sessoes = this.getSessoes();
    sessoes = sessoes.map((s) => (s.id === updated.id ? updated : s));
    saveAll('sessao', sessoes);
  },

  deleteSessao(id: string) {
    let sessoes = this.getSessoes();
    sessoes = sessoes.filter((s) => s.id !== id);
    saveAll('sessao', sessoes);
  },

  // --- INGRESSO ---
  getIngressos(): Ingresso[] {
    return getAll<Ingresso>('ingresso');
  },

  addIngresso(ingresso: Ingresso) {
    const ingressos = this.getIngressos();
    ingressos.push(ingresso);
    saveAll('ingresso', ingressos);
  },

  updateIngresso(updated: Ingresso) {
    let ingressos = this.getIngressos();
    ingressos = ingressos.map((i) => (i.id === updated.id ? updated : i));
    saveAll('ingresso', ingressos);
  },

  deleteIngresso(id: string) {
    let ingressos = this.getIngressos();
    ingressos = ingressos.filter((i) => i.id !== id);
    saveAll('ingresso', ingressos);
  },
};
