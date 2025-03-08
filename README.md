# Desafio Itaú - Backend
Este projeto é uma API RESTful desenvolvida para gerenciar transações financeiras e fornecer estatísticas em tempo real. Utiliza TypeScript e Fastify, com dados armazenados em memória (sem banco de dados externo). A aplicação permite criar transações, deletar todas as transações e calcular estatísticas (contagem, soma, média, mínimo e máximo) das transações dos últimos 60 segundos.

## Funcionalidades
- **Criação de Transações:** Adiciona uma nova transação com valor e data/hora.
- **Deleção de Transações:** Remove todas as transações armazenadas.
- **Estatísticas em Tempo Real:** Retorna estatísticas das transações dos últimos 60 segundos.

## Tecnologias Utilizadas

- **TypeScript:** Para tipagem estática e código robusto.
- **Fastify:** Framework web de alta performance para Node.js.
- **Zod:** Validação de esquemas de entrada.
- **Vitest:** Framework de testes unitários.
- **ESLint:** Ferramenta de linting para qualidade de código.
- **date-fns:** Biblioteca para manipulação de datas.
- **pnpm:** Gerenciador de pacotes.

## Pré-requisitos
- **Node.js:** Versão 18 ou superior.
- **pnpm:** Versão 9 ou superior (recomendado).
- **Git:** Para clonar o repositório.

## Instalação
**1. Clone o repositório:**

```bash
git clone https://github.com/lbfrancisco/desafio-itau-backend.git
cd desafio-itau-backend
Instale as dependências:
```

**2. Instale as dependências:**
```bash
pnpm install
```

**3. Configure as variáveis de ambiente:**

Copie o arquivo .env.example para .env e ajuste conforme necessário:

```bash
cp .env.example .env
```

**4. Exemplo de conteúdo do .env:**

```text
STATISTICS_TRANSACTIONS_RANGE_IN_MINUTES=1
PORT=3333
```

- **STATISTICS_TRANSACTIONS_RANGE_IN_MINUTES:** Intervalo para cálculo das estatísticas (padrão: 1 minuto).
- **PORT:** Porta da aplicação (padrão: 3333).

## Uso
**1. Executando em Desenvolvimento**

Inicie o servidor com recarregamento automático:

```bash
pnpm dev
```
A API estará disponível em http://localhost:3333.

**2. Construindo para Produção**

Compile o projeto:

```bash
pnpm build
```

Os arquivos compilados serão gerados na pasta build.

**3. Executando em Produção**

Após a compilação, inicie o servidor:

```bash
pnpm start
```

## Endpoints da API
**1. Criar Transação**
- **Método:** POST
- **Rota:** /transacao
- **Corpo da Requisição:**


```json
{
  "valor": 100.50,
  "dataHora": "2025-03-07T10:00:00.000Z"
}
```
- **Respostas:**
  - **201 Created:** Transação criada.
  - **400 Bad Request:** JSON inválido.
  - **422 Unprocessable Entity:** Dados inválidos (valor negativo ou data no futuro).

**2. Deletar Todas as Transações**
- **Método:** DELETE
- **Rota:** /transacao

- **Resposta:**
  - **200 OK:** Transações removidas com sucesso.

**3. Obter Estatísticas**
- **Método:** GET
- **Rota:** /estatistica
- **Resposta:**
```json
{
  "count": 3,
  "sum": 250.75,
  "avg": 83.58,
  "min": 50.25,
  "max": 100.50
}
```
- Retorna estatísticas das transações dos últimos 60 segundos.
- Se não houver transações, todos os valores serão **0**.

## Scripts Disponíveis
- **pnpm dev:** Inicia o servidor em modo de desenvolvimento.
- **pnpm start:** Executa a versão compilada.
- **pnpm build:** Compila o projeto para **build/**.
- **pnpm test:** Executa os testes unitários uma vez.
- **pnpm test:watch:** Executa os testes em modo de observação.

## Estrutura do Projeto
```text

desafio-itau-backend/
├── .editorconfig              # Configuração do EditorConfig
├── .env                       # Variáveis de ambiente
├── .env.example               # Exemplo de variáveis de ambiente
├── .eslintignore              # Arquivos ignorados pelo ESLint
├── .eslintrc.json             # Configuração do ESLint
├── .gitignore                 # Arquivos ignorados pelo Git
├── package.json               # Dependências e scripts
├── pnpm-lock.yaml             # Lockfile do pnpm
├── README.md                  # Este arquivo
├── src/
│   ├── @types/                # Definições de tipos
│   │   └── transaction.ts     # Tipo da transação
│   ├── app.ts                 # Configuração principal do Fastify
│   ├── arquivos/              # Arquivos adicionais (possivelmente temporários)
│   │   ├── app.ts             # Configuração alternativa do Fastify
│   │   └── server.ts          # Servidor alternativo
│   ├── env/                   # Configuração de variáveis de ambiente
│   │   └── index.ts           # Carregamento do .env com Zod
│   ├── http/                  # Controladores HTTP
│   │   ├── create-transaction.ts          # Endpoint POST /transacao
│   │   ├── delete-transactions.ts         # Endpoint DELETE /transacao
│   │   └── get-transactions-statistics.ts # Endpoint GET /estatistica
│   ├── repositories/          # Repositórios de dados
│   │   ├── in-memory/         # Implementação em memória
│   │   └── transactions-repository.ts # Interface do repositório
│   ├── server.ts              # Ponto de entrada da aplicação
│   └── use-cases/             # Casos de uso (lógica de negócio)
│       ├── create-transaction-use-case.ts        # Lógica de criação
│       ├── create-transaction-use-case.spec.ts   # Testes de criação
│       ├── delete-transactions-use-case.ts       # Lógica de deleção
│       ├── delete-transactions-use-case.spec.ts  # Testes de deleção
│       ├── errors/            # Erros personalizados
│       ├── factories/         # Fábricas para instâncias
│       ├── get-transactions-statistics-use-case.ts       # Lógica de estatísticas
│       └── get-transactions-statistics-use-case.spec.ts  # Testes de estatísticas
├── tsconfig.json              # Configuração do TypeScript
└── vite.config.mjs            # Configuração do Vitest
```

## Testes
Os testes unitários estão na pasta **src/use-cases** e cobrem os casos de uso principais. Execute-os com:

```bash
pnpm test
```


Para modo contínuo:

```bash
pnpm test:watch
```

## Dependências Principais
- fastify: Framework web.
- zod: Validação de esquemas.
- fastify-type-provider-zod: Integração entre Fastify e Zod.
- date-fns: Manipulação de datas.
- vitest: Testes unitários.
- tsup: Compilação do projeto.
- tsx: Execução direta de TypeScript.

Veja **package.json** para a lista completa.

## Contribuição
1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
```bash
git checkout -b feature/nova-funcionalidade
```
3. Commit suas alterações:
```bash
git commit -m "Adiciona nova funcionalidade"
```
4. Envie para o repositório remoto:
```bash
git push origin feature/nova-funcionalidade
```
5. Abra um Pull Request.

## Licença
Licenciado sob a Licença ISC (veja **package.json**).

## Contato
Para dúvidas ou sugestões, contate o autor no GitHub: <a href="https://github.com/lbfrancisco">lbfrancisco</a>.
