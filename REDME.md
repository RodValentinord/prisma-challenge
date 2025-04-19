# Prisma Challenge Performance Demo

Este repositório contém um exemplo de aplicação Next.js usando Prisma e PostgreSQL para demonstrar otimizações de consultas e indexação.

## Índice
1. [Visão Geral](#visão-geral)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Pré‑requisitos](#pré-requisitos)
4. [Instalação](#instalação)
5. [Seed de Dados](#seed-de-dados)
6. [Execução da Aplicação](#execução-da-aplicação)
7. [Benchmark](#benchmark)
8. [Branches e Versionamento](#branches-e-versionamento)
9. [Próximos Passos](#próximos-passos)

---

## Visão Geral
Este projeto demonstra como otimizar um endpoint que busca usuários e seus posts:

- **before/**: versão original com `include` (N+1) e sem índice
- **after/**: versão otimizada com `select`, índice em `Post.userId` e `connection_limit`

Inclui scripts de seed, benchmark e instruções para medir ganhos de performance.

---

## Estrutura do Projeto
```
prisma-challenge/
├── before/       # Código original
│   ├── pages/api/users.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── bench.js  # Script de benchmark
│   └── prisma/seed.js  # Script de seed
├── after/        # Código otimizado
│   ├── pages/api/users.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── bench.js
│   └── prisma/seed.js
└── README.md     # Este arquivo
```

---

## Pré‑requisitos
- Node.js (≥ 16)
- npm ou Yarn
- Docker (para rodar PostgreSQL local)
- Git

---

## Instalação
1. Clone este repositório:
   ```bash
   git clone git@github.com:<seu-user>/prisma-challenge.git
   cd prisma-challenge
   ```
2. Inicie o PostgreSQL com Docker:
   ```bash
docker-compose up -d
   ```
3. Instale dependências nas pastas `before/` e `after/`:
   ```bash
cd before && npm install
cd ../after && npm install
cd ..
   ```

---

## Seed de Dados
Para popular o banco com 1.000 usuários e 10.000 posts em **before** e **after**:

```bash
# Antes
cd before
npm run seed
# Depois
cd ../after
npm run seed
```

---

## Execução da Aplicação
Inicie o servidor Next.js:

```bash
# Em before/
npm run dev
# Em after/
npm run dev
```


---

## Benchmark
Use o script `bench.js` para medir latência e throughput:

```bash
# Em before/
node bench.js
# Em after/
node bench.js
```

Compare `latency.average` e `requests.average` para verificar ganhos de performance.

---

## Branches e Versionamento
1. Crie tags para comparar estados:
   ```bash
git tag before-optimization
# Após otimizações
git tag after-optimization
git push --follow-tags
   ```
2. Para cache em memória, use branch:
   ```bash
git checkout -b feature/cache-endpoint
   ```

---

## Próximos Passos
- Adicionar cache em memória ou Redis
- Implementar PgBouncer para pooling avançado
- Integrar benchmarks no CI
- Adicionar monitoramento (Prometheus/Datadog)

---

**Autor**: Rodolfo Valentino

