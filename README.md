# CineControl 🎬

Bem-vindo ao CineControl! Uma aplicação web moderna desenvolvida para gerenciar filmes, salas de cinema, sessões e venda de ingressos. Este projeto foi construído com Next.js, TypeScript e Tailwind CSS, e utiliza o `localStorage` do navegador para persistência de dados.

## ✨ Principais Funcionalidades

* **Gerenciamento de Filmes:** Cadastro, listagem e visualização de detalhes dos filmes.
* **Gerenciamento de Salas:** Cadastro e listagem de salas de cinema.
* **Gerenciamento de Sessões:** Cadastro e listagem de sessões (horários dos filmes nas salas).
* **Venda de Ingressos:** Formulário para simular a venda de ingressos para sessões específicas.
* **Homepage Dinâmica:** Apresenta um carrossel com filmes em destaque (se houver filmes suficientes cadastrados).
* **Interface Responsiva:** Adaptada para diferentes tamanhos de tela.
* **Tema Escuro Personalizado:** Uma interface elegante com um tema escuro e variações de tons azuis, implementado com variáveis CSS customizadas.

## 🛠️ Tecnologias Utilizadas

* **Framework:** [Next.js](https://nextjs.org/) (v13+ com App Router)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Componentização:** [React](https://reactjs.org/)
* **Formulários:**
    * [React Hook Form](https://react-hook-form.com/)
    * [Yup](https://github.com/jquense/yup) (para validação de schemas)
* **Carrossel:** [Swiper.js](https://swiperjs.com/)
* **Ícones:** [Font Awesome](https://fontawesome.com/) (via `@fortawesome/react-fontawesome`)
* **Utilitários:**
    * `clsx` (para construção condicional de classNames)
    * `uuid` (para geração de IDs únicos)
* **Persistência de Dados:** `localStorage` do navegador (através de um `localStorageManager` customizado).

## 🚀 Começando

Siga estas instruções para configurar e rodar o projeto localmente.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão LTS recomendada, que inclui npm)
* [Yarn](https://yarnpkg.com/) (opcional, pode usar npm)
* [Git](https://git-scm.com/)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [git@github.com:Wisley56/Cine-Control-WVision.git](https://github.com/Wisley56/Cine-Control-WVision)
    cd Cinema-React
    ```

2.  **Instale as dependências:**
    Usando npm:
    ```bash
    npm install
    ```
    Ou usando Yarn:
    ```bash
    yarn install
    ```

3.  **Variáveis de Ambiente (Opcional - se aplicável a outras partes do projeto):**
    Se o projeto utilizar APIs externas que requerem chaves (como a API do TMDB mencionada no README original do seu repositório), crie um arquivo `.env.local` na raiz do projeto e adicione as chaves necessárias. Exemplo:
    ```env
    NEXT_PUBLIC_TMDB_API_KEY=SUA_CHAVE_API_AQUI
    ```
    *Obs: As funcionalidades que revisamos e estilizamos utilizam principalmente o `localStorage` para os dados de filmes, salas, sessões e ingressos.*

### Rodando o Projeto

1.  **Inicie o servidor de desenvolvimento:**
    Usando npm:
    ```bash
    npm run dev
    ```
    Ou usando Yarn:
    ```bash
    yarn dev
    ```

2.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

## 🎨 Tema

O projeto apresenta um tema escuro customizado com uma paleta de cores focada em tons de azul e cinzas escuros. As cores são gerenciadas através de variáveis CSS (custom properties) definidas no arquivo de estilo global (`src/app/globals.css` ou similar), permitindo fácil customização e consistência visual em toda a aplicação.