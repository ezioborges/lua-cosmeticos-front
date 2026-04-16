# Lua Cosmeticos Front

Frontend da Lua Cosmeticos, construído com Next.js (App Router), React, TypeScript e Tailwind CSS.

O projeto foi estruturado como um case tecnico focado em:

- Experiencia visual de e-commerce de cosmeticos naturais
- Fluxo de autenticacao por API
- Base moderna para evolucao com boas praticas de frontend

## Visao Geral

Atualmente a aplicacao possui duas experiencias principais:

- Home institucional/comercial com vitrine de produtos em destaque
- Tela de login conectada a API externa para autenticacao

Fluxo atual de login:

1. Usuario informa e-mail e senha em `/login`
2. Frontend envia `POST /auth/login` para a API configurada
3. Token e lido de `response.data.userLog.access_token`
4. Token e salvo no `localStorage` com chave `token`
5. Usuario e redirecionado para `/`

## Stack Tecnica

- Next.js `16.2.3`
- React `19.2.4`
- TypeScript `5`
- Tailwind CSS `4`
- Axios para consumo HTTP
- Lucide React para icones
- ESLint (Next + TypeScript)
- Vitest + Testing Library para testes
- Husky para automacao de hooks Git

## Estrutura do Projeto

```text
.
|- scripts/
|  |- start.mjs                # Inicializacao customizada (porta + auto-open browser)
|- src/
|  |- app/
|  |  |- globals.css           # Estilos globais + tema base
|  |  |- layout.tsx            # Layout raiz e metadata
|  |  |- page.tsx              # Home principal
|  |  |- login/
|  |  |  |- page.tsx           # Tela de login e autenticacao
|  |- services/
|  |  |- api.ts                # Cliente Axios e baseURL da API
|  |- __tests__/
|  |  |- dummy.test.ts         # Teste inicial de setup
|- next.config.ts
|- eslint.config.mjs
|- tailwind.config.ts
|- tsconfig.json
```

## Requisitos

- Node.js 20+
- npm 10+

## Instalacao

```bash
npm install
```

## Configuracao de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
PORT=3000
```

Variaveis usadas hoje:

- `NEXT_PUBLIC_API_URL`: URL base da API consumida pelo frontend
- `PORT`: porta desejada para execucao do Next

Observacoes sobre inicializacao:

- O projeto usa `scripts/start.mjs` para iniciar a aplicacao
- Em `dev`, a porta usada e a informada em `PORT` (ou `3000` por padrao)
- Em `start`, se a porta estiver ocupada, o script busca outra porta disponivel
- O navegador e aberto automaticamente na rota `/login`

## Scripts Disponiveis

```bash
npm run dev      # Ambiente de desenvolvimento
npm run build    # Build de producao
npm run start    # Servidor Next em modo producao
npm run lint     # Analise estatica com ESLint
npm run test     # Testes com Vitest
```

## Qualidade e Padroes

- TypeScript em modo `strict`
- Alias de importacao: `@/*` apontando para `src/*`
- ESLint com regras de Core Web Vitals do Next
- Base pronta para expandir suite de testes com Vitest + Testing Library

## Integracao com API

Cliente HTTP centralizado em `src/services/api.ts`:

- `baseURL`: `process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'`
- Header padrao: `Content-Type: application/json`

Endpoint utilizado no momento:

- `POST /auth/login`

Resposta esperada pelo frontend:

```json
{
	"userLog": {
		"access_token": "<jwt-ou-token>"
	}
}
```

## Interface e Identidade

Direcao visual aplicada no estado atual:

- Linguagem natural e premium para a marca Lua Cosmeticos
- Paleta com destaque para tons quentes (`brand.gold`) e contraste escuro (`brand.dark`)
- Home com hero de alto impacto e cards de produto
- Login centralizado com foco em conversao

## Estado Atual e Proximos Passos

Este repositório ja esta pronto para evoluir com backlog de produto. Sugestoes naturais de proxima iteracao:

1. Persistencia de sessao com estrategia segura (cookies httpOnly ou camada dedicada)
2. Guards de rota para areas autenticadas
3. Catalogo dinamico vindo da API (substituindo dados mockados)
4. Cadastro de usuario e recuperacao de senha
5. Cobertura de testes para login, redirecionamento e tratamento de erro
6. Pipeline CI para lint, test e build automaticos

## Comandos Rapidos

```bash
# 1) Instalar dependencias
npm install

# 2) Rodar em desenvolvimento
npm run dev

# 3) Abrir no navegador (caso nao abra automaticamente)
# http://localhost:3000/login

# 4) Validar qualidade
npm run lint && npm run test
```

## Licenca

Projeto para estudo tecnico e demonstracao de frontend.
