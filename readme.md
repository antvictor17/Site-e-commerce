# 📦 API de Sistema de Estoque
 
API RESTful para gerenciamento de estoque desenvolvida com Node.js, Express, PostgreSQL e autenticação JWT.
 
---
 
## 🚀 Tecnologias
 
- **Node.js** — Ambiente de execução JavaScript
- **Express** — Framework web
- **PostgreSQL** — Banco de dados relacional
- **JWT (jsonwebtoken)** — Autenticação via token
- **bcryptjs** — Hash de senhas
- **nodemailer** — Envio de e-mails
- **dotenv** — Variáveis de ambiente
- **cors** — Controle de acesso entre origens
- **nodemon** — Reinicialização automática em desenvolvimento
---
 
## 📋 Pré-requisitos
 
- [Node.js](https://nodejs.org/) v18 ou superior
- [PostgreSQL](https://www.postgresql.org/) instalado e rodando
- Conta no [Mailtrap](https://mailtrap.io) (para testes de e-mail)
---
 
## ⚙️ Instalação e configuração
 
### 1. Clone ou baixe o projeto
 
```bash
git clone <url-do-repositorio>
cd Projeto
```
 
### 2. Instale as dependências
 
```bash
npm install
```
 
### 3. Configure as variáveis de ambiente
 
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
 
```env
PORT=3000
DATABASE_URL=postgresql://postgres:sua_senha@localhost:5432/estoque_db
JWT_SECRET=seu_secret_aqui
JWT_EXPIRES_IN=1d
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=seu_usuario_mailtrap
EMAIL_PASS=sua_senha_mailtrap
```
 
### 4. Crie o banco de dados e as tabelas
 
Acesse o PostgreSQL:
 
```bash
psql -U postgres
```
 
Crie o banco e conecte:
 
```sql
CREATE DATABASE estoque_db;
\c estoque_db
```
 
Execute os scripts na ordem abaixo (respeite a ordem por causa das foreign keys):
 
```sql
-- 1. Usuários
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'employee',
  reset_token TEXT,
  reset_token_expiry TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
 
-- 2. Fornecedores
CREATE TABLE suppliers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(20),
  cnpj VARCHAR(20) UNIQUE,
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
 
-- 3. Produtos (depende de suppliers)
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  quantity INTEGER DEFAULT 0,
  min_quantity INTEGER DEFAULT 5,
  supplier_id INTEGER REFERENCES suppliers(id),
  created_at TIMESTAMP DEFAULT NOW()
);
 
-- 4. Movimentações de estoque (depende de products e users)
CREATE TABLE stock_movements (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  user_id INTEGER REFERENCES users(id),
  type VARCHAR(10) NOT NULL,
  quantity INTEGER NOT NULL,
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```
 
### 5. Inicie o servidor
 
```bash
# Desenvolvimento (com hot reload)
npm run dev
 
# Produção
npm start
```
 
O servidor estará disponível em `http://localhost:3000`.
 
---
 
## 📁 Estrutura do projeto
 
```
Projeto/
├── src/
│   ├── config/
│   │   └── database.js          # Conexão com o PostgreSQL
│   ├── controllers/
│   │   ├── authController.js    # Lógica de autenticação
│   │   ├── productController.js # Lógica de produtos
│   │   └── supplierController.js# Lógica de fornecedores
│   ├── middlewares/
│   │   └── authMiddleware.js    # Verificação do token JWT
│   ├── routes/
│   │   ├── authRoutes.js        # Rotas de autenticação
│   │   ├── productRoutes.js     # Rotas de produtos
│   │   └── supplierRoutes.js    # Rotas de fornecedores
│   └── app.js                   # Configuração principal do Express
├── .env                         # Variáveis de ambiente (não versionar)
├── .gitignore
└── package.json
```
 
---
 
## 🔐 Autenticação
 
As rotas protegidas exigem um token JWT no header de cada requisição:
 
```
Authorization: Bearer <seu_token_aqui>
```
 
O token é obtido ao fazer login na rota `/auth/login`.
 
---
 
## 📡 Endpoints
 
### 🔑 Auth — `/auth`
 
#### `POST /auth/register` — Cadastrar usuário
 
Não requer autenticação.
 
**Body:**
```json
{
  "name": "Marcelo Silva",
  "email": "marcelo@email.com",
  "password": "123456",
  "role": "admin"
}
```
 
> `role` pode ser `"admin"` ou `"employee"`. Se omitido, o padrão é `"employee"`.
 
**Resposta de sucesso (201):**
```json
{
  "user": {
    "id": 1,
    "name": "Marcelo Silva",
    "email": "marcelo@email.com",
    "role": "admin"
  }
}
```
 
---
 
#### `POST /auth/login` — Login
 
Não requer autenticação.
 
**Body:**
```json
{
  "email": "marcelo@email.com",
  "password": "123456"
}
```
 
**Resposta de sucesso (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Marcelo Silva",
    "email": "marcelo@email.com",
    "role": "admin"
  }
}
```
 
---
 
#### `POST /auth/forgot-password` — Solicitar recuperação de senha
 
Não requer autenticação. Envia um e-mail com link de redefinição para o endereço informado.
 
**Body:**
```json
{
  "email": "marcelo@email.com"
}
```
 
**Resposta de sucesso (200):**
```json
{
  "message": "Se o e-mail existir, você receberá as instruções"
}
```
 
> Por segurança, a resposta é a mesma independente de o e-mail existir ou não.
 
---
 
#### `POST /auth/reset-password/:token` — Redefinir senha
 
Não requer autenticação. O `:token` vem no link enviado por e-mail.
 
**Body:**
```json
{
  "password": "nova_senha123"
}
```
 
**Resposta de sucesso (200):**
```json
{
  "message": "Senha redefinida com sucesso"
}
```
 
---
 
### 🏭 Fornecedores — `/suppliers`
 
> Todas as rotas de fornecedores requerem autenticação JWT.
 
#### `GET /suppliers` — Listar todos os fornecedores
 
**Resposta de sucesso (200):**
```json
[
  {
    "id": 1,
    "name": "Fornecedor ABC",
    "email": "contato@abc.com",
    "phone": "84999999999",
    "cnpj": "12.345.678/0001-99",
    "address": "Rua das Flores, 123 - Mossoró/RN",
    "created_at": "2026-06-08T14:52:00.000Z"
  }
]
```
 
---
 
#### `GET /suppliers/:id` — Buscar fornecedor por ID
 
**Resposta de sucesso (200):**
```json
{
  "id": 1,
  "name": "Fornecedor ABC",
  "email": "contato@abc.com",
  "phone": "84999999999",
  "cnpj": "12.345.678/0001-99",
  "address": "Rua das Flores, 123 - Mossoró/RN",
  "created_at": "2026-06-08T14:52:00.000Z"
}
```
 
**Resposta de erro (404):**
```json
{ "message": "Fornecedor não encontrado" }
```
 
---
 
#### `POST /suppliers` — Criar fornecedor
 
**Body:**
```json
{
  "name": "Fornecedor ABC",
  "email": "contato@abc.com",
  "phone": "84999999999",
  "cnpj": "12.345.678/0001-99",
  "address": "Rua das Flores, 123 - Mossoró/RN"
}
```
 
**Resposta de sucesso (201):** retorna o fornecedor criado.
 
---
 
#### `PUT /suppliers/:id` — Atualizar fornecedor
 
**Body:** mesmos campos do POST, todos obrigatórios.
 
```json
{
  "name": "Fornecedor ABC Atualizado",
  "email": "novo@abc.com",
  "phone": "84988888888",
  "cnpj": "12.345.678/0001-99",
  "address": "Rua Nova, 456 - Mossoró/RN"
}
```
 
**Resposta de sucesso (200):** retorna o fornecedor atualizado.
 
---
 
#### `DELETE /suppliers/:id` — Deletar fornecedor
 
**Resposta de sucesso (200):**
```json
{ "message": "Fornecedor deletado com sucesso" }
```
 
---
 
### 📦 Produtos — `/products`
 
> Todas as rotas de produtos requerem autenticação JWT.
 
#### `GET /products` — Listar todos os produtos
 
Retorna todos os produtos com o nome do fornecedor e um campo `low_stock` indicando se o estoque está abaixo do mínimo.
 
**Resposta de sucesso (200):**
```json
[
  {
    "id": 1,
    "name": "Teclado Mecânico",
    "description": "Teclado mecânico switch azul",
    "price": "299.90",
    "quantity": 2,
    "min_quantity": 3,
    "supplier_id": 1,
    "supplier_name": "Fornecedor ABC",
    "low_stock": true,
    "created_at": "2026-06-08T20:52:00.000Z"
  }
]
```
 
---
 
#### `GET /products/:id` — Buscar produto por ID
 
**Resposta de sucesso (200):** retorna o produto com `supplier_name` e `low_stock`.
 
**Resposta de erro (404):**
```json
{ "message": "Produto não encontrado" }
```
 
---
 
#### `POST /products` — Criar produto
 
**Body:**
```json
{
  "name": "Teclado Mecânico",
  "description": "Teclado mecânico switch azul",
  "price": 299.90,
  "quantity": 10,
  "min_quantity": 3,
  "supplier_id": 1
}
```
 
> `min_quantity` é opcional. Se omitido, o padrão é `5`.
> `supplier_id` deve ser o ID de um fornecedor já cadastrado.
 
**Resposta de sucesso (201):** retorna o produto criado.
 
---
 
#### `PUT /products/:id` — Atualizar produto
 
**Body:** mesmos campos do POST, todos obrigatórios.
 
```json
{
  "name": "Teclado Mecânico Premium",
  "description": "Teclado mecânico switch azul com RGB",
  "price": 349.90,
  "quantity": 8,
  "min_quantity": 3,
  "supplier_id": 1
}
```
 
**Resposta de sucesso (200):** retorna o produto atualizado.
 
---
 
#### `DELETE /products/:id` — Deletar produto
 
**Resposta de sucesso (200):**
```json
{ "message": "Produto deletado com sucesso" }
```
 
---
 
## ❌ Erros comuns
 
| Código | Descrição |
|--------|-----------|
| 400 | Dados inválidos ou e-mail já cadastrado |
| 401 | Token ausente, inválido ou expirado |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |
 
---
 
## 🧪 Testando a API
 
Recomenda-se usar o [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/).
 
**Fluxo sugerido para testes:**
 
1. `POST /auth/register` — Crie um usuário admin
2. `POST /auth/login` — Faça login e copie o token
3. Adicione o token no header das próximas requisições: `Authorization: Bearer <token>`
4. `POST /suppliers` — Crie um fornecedor
5. `POST /products` — Crie um produto usando o `id` do fornecedor criado
6. Teste os demais endpoints de listagem, atualização e exclusão
---
 