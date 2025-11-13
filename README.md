# ClickBeard

Sistema para gerenciamento de agendamentos de barbeiros, desenvolvido com **React (Vite)** no frontend e **Node.js + Express** no backend, seguindo arquitetura **DDD (Domain, Service, Repository, Controller)**.  
O banco de dados é executado via Docker.

---

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- [Node.js v18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)

----------------------------

## Rodando o Banco de Dados (Docker)

1. Acesse a pasta do backend (ou o diretório onde está o `docker-compose.yml`).
2. Execute o comando:

docker-compose up -d

----------------------------
## Configuração do Backend

Crie um arquivo .env na raiz do backend com as variáveis de ambiente, por exemplo:
DATABASE_URL="postgresql://joao.brambati:12345@localhost:5432/clickbeard?schema=public"

Instale as dependências (na pasta backend):
npm install

Em seguida, rode uma migration para criar as tabelas no banco:
npx prisma migrate dev --name init

Execute o backend:
npm run dev

----------------------------
## Configuração do Backend

Instale as dependências (na pasta frontend):
npm install

Execute o frontend:
npm run dev

----------------------------
## Perfil - Admin
Crie ou altere um usuário no banco com `tipo = admin`:

| id | nome       | email                  | tipo   | senha                                                                                     |
|----|------------|------------------------|--------|-------------------------------------------------------------------------------------------|
| 1  | João Vitor | joaobrambati@gmail.com | admin  | $2b$10$Q4CLhk3hM11iO1BwLRcKxu30q0Vxt8TEPPK5zci6.ZzamkSKn6xgy                               |
| 5  | teste      | teste@gmail.com        | cliente| $2b$10$.6.BG2ltNAe0RM151dVAnOsEjA.Tb3KwMWWxAuWTOhBYl6p6YdtBG                               |


 ----------------------------

 ## Qualquer dúvida só me mandar no whats :)
  (27) 99790-0875
