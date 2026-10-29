# API de Gestão de Atividades Acadêmicas

Projeto acadêmico para praticar o desenvolvimento de uma API REST usando Node.js e Express.

## Objetivo
A API permite cadastrar disciplinas e atividades, consultar os registros e atualizar o status de uma atividade. A ideia é ajudar a organizar as atividades de uma turma.

## Classes principais
- **Disciplina**: id, nome e professor.
- **Atividade**: id, titulo, descricao, dataEntrega, status e disciplinaId.

Uma disciplina pode ter várias atividades. Cada atividade pertence a uma disciplina.

## Tecnologias
- Node.js
- Express
- JavaScript
- Dados mantidos em memória (não usa banco de dados nesta versão inicial).

## Como executar
1. Instale o [Node.js](https://nodejs.org/).
2. Baixe ou clone este repositório.
3. No terminal, dentro da pasta do projeto, execute:

```bash
npm install
npm start
```

A API ficará disponível em `http://localhost:3000`.

## Rotas implementadas

| Método | Rota | O que faz |
|---|---|---|
| GET | `/` | Mostra uma mensagem inicial |
| GET | `/api/health` | Verifica se a API está funcionando |
| GET | `/api/disciplinas` | Lista as disciplinas |
| POST | `/api/disciplinas` | Cadastra uma disciplina |
| GET | `/api/atividades` | Lista as atividades |
| GET | `/api/atividades/:id` | Busca uma atividade pelo ID |
| POST | `/api/atividades` | Cadastra uma atividade |
| PATCH | `/api/atividades/:id/status` | Atualiza o status de uma atividade |

## Exemplos de JSON

Criar disciplina (`POST /api/disciplinas`):

```json
{
  "nome": "Desenvolvimento Web",
  "professor": "Professor da disciplina"
}
```

Criar atividade (`POST /api/atividades`):

```json
{
  "titulo": "Atividade de API",
  "descricao": "Implementar parte da API REST",
  "dataEntrega": "2026-11-10",
  "disciplinaId": 1
}
```

Atualizar status (`PATCH /api/atividades/1/status`):

```json
{
  "status": "concluida"
}
```

Os status aceitos são `pendente`, `em andamento` e `concluida`.

## Verbos e códigos HTTP
- **GET** consulta informações.
- **POST** cria um registro.
- **PATCH** altera parte de um registro.
- **200 OK** indica que a consulta ou alteração deu certo.
- **201 Created** indica que um registro foi criado.
- **400 Bad Request** indica dados inválidos.
- **404 Not Found** indica que o registro não foi encontrado.

## Limitações desta versão
Os dados ficam em memória e são perdidos quando o servidor é reiniciado. A implementação é uma primeira parte da API, para evoluir depois com banco de dados e mais validações.

## Diagrama de classes
O arquivo `docs/diagrama-classes.puml` contém o diagrama em PlantUML.
