
# Backend API - Wefit

Este projeto é uma API RESTful para gerenciamento de perfis de usuários (PF e PJ), com autenticação JWT e integração com um banco de dados MySQL.

## Funcionalidades

- Autenticação de usuários usando JWT.
```
  email: "wefit@wefit.com",
  password: "senha_root_123",
```
- Criação de perfis do tipo Pessoa Física (PF) e Pessoa Jurídica (PJ).
- Verificação de CPF e CNPJ únicos para perfis.
- Aceite de termos como requisito para criação de perfil.
- Documentação da API com Swagger.

## Tecnologias Utilizadas

- **Node.js** - Ambiente de execução.
- **TypeScript** - Linguagem de programação utilizada.
- **NestJS** - Framework para construção de aplicações Node.js escaláveis.
- **MySQL** - Banco de dados relacional.
- **TypeORM** - ORM para manipulação de dados.
- **Jest** - Testes unitários.
- **Docker** - Containerização dos serviços.
- **Swagger** - Documentação da API.

## Configuração e Instalação

### Pré-requisitos

- **Node.js** (>=14)
- **Docker** e **Docker Compose**
- **DBeaver** ou outro cliente SQL para acessar o banco de dados (opcional)

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
MYSQLDB_PASSWORD=senha_root_123
MYSQLDB_PORT=3306
MYSQLDB_DATABASE=wefit
DB_HOST=localhost
JWT_SECRET=seu_segredo_jwt_aqui
JWT_EXPIRES_IN=1h
```

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/jayymeson/teste-backend-wefit.git
   cd test-backend-wefit
   ```

2. Instale as dependências:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Inicie os containers do Docker:
   ```bash
   docker-compose up -d
   ```

4. Verifique se o banco de dados foi criado corretamente. Caso não, conecte-se ao MySQL e crie manualmente:
   ```sql
   CREATE DATABASE wefit;
   ```

5. Execute as migrações do banco de dados:
   ```bash
   npm run migration:run
   ```

6. Inicie o servidor:
   ```bash
   npm start
   ```

A API estará disponível em `http://localhost:4568`.

### Testes

Para rodar os testes, execute:

```bash
npm test
```

## Endpoints Principais

- **POST /api/login** - Autentica o usuário e retorna um token JWT.
- **POST /api/profile** - Cria um novo perfil (requer autenticação JWT).

### Exemplo de Requisição para Criação de Perfil

```json
POST /api/profile
{
  "type": "PF",
  "cpf": "12345678909",
  "name": "João da Silva",
  "cell": "+5511987654321",
  "phone": "+551134567890",
  "email": "joao.silva@example.com",
  "address": {
    "zipCode": "12345-678",
    "street": "Rua das Flores",
    "number": "123",
    "city": "Rio de Janeiro",
    "neighborhood": "Centro",
    "state": "RJ"
  },
  "termsAccepted": true
}
```

### Documentação da API

A documentação Swagger está disponível em `http://localhost:4568/api-docs`.

## Estrutura de Pastas

- **src/** - Código-fonte do projeto.
  - **application/** - Casos de uso da aplicação.
  - **domain/** - Entidades e contratos de domínio.
  - **http/** - Controladores, DTOs e rotas da API.
  - **infra/** - Configurações e repositórios de infraestrutura.
  - **shared/** - Enumerações e utilitários.
  - **__tests__/** - Testes unitários.

## Problemas Comuns

- **Erro de Banco de Dados Não Encontrado**: Certifique-se de que o banco `wefit` existe e está rodando no container do MySQL.
- **Erro de Coluna Duplicada nas Migrações**: Caso tenha problemas ao aplicar migrações, você pode deletar a tabela `migrations` e recriá-la, ou ajustar manualmente as migrações.

## Contribuição

Contribuições são bem-vindas! Por favor, envie um pull request com suas alterações.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).

