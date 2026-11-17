# API de Gestão de Atividades Acadêmicas

Projeto acadêmico desenvolvido para praticar a criação de uma API REST com Node.js e Express.

## Objetivo

A API permite cadastrar e consultar disciplinas e atividades acadêmicas, atualizar o status de uma atividade e excluir atividades.

## Tecnologias

- Node.js
- Express
- JavaScript
- Dados armazenados em memória (sem banco de dados nesta versão).

## Como executar

1. Instale o [Node.js](https://nodejs.org/).
2. Clone ou baixe este repositório.
3. Abra o terminal na pasta do projeto.
4. Execute:

```bash
npm install
npm start
```

A API ficará disponível em `http://localhost:3000`.

## Rotas disponíveis

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Exibe informações da API e suas rotas |
| GET | `/api/health` | Verifica se a API está funcionando |
| GET | `/api/disciplinas` | Lista as disciplinas |
| POST | `/api/disciplinas` | Cadastra uma disciplina |
| GET | `/api/atividades` | Lista as atividades |
| GET | `/api/atividades/:id` | Busca uma atividade pelo ID |
| POST | `/api/atividades` | Cadastra uma atividade |
| PATCH | `/api/atividades/:id/status` | Atualiza o status de uma atividade |
| DELETE | `/api/atividades/:id` | Exclui uma atividade |

## Exemplos de requisição

As requisições POST e PATCH devem enviar o cabeçalho `Content-Type: application/json`.

### Cadastrar disciplina

`POST /api/disciplinas`

```json
{
  "nome": "Desenvolvimento Web",
  "professor": "Professor da disciplina"
}
```

### Cadastrar atividade

`POST /api/atividades`

```json
{
  "titulo": "Atividade de API",
  "descricao": "Implementar parte da API REST",
  "dataEntrega": "2026-11-10",
  "disciplinaId": 1
}
```

A data deve estar no formato `AAAA-MM-DD` e corresponder a uma data real. O ID da disciplina deve existir.

### Atualizar status

`PATCH /api/atividades/1/status`

```json
{
  "status": "concluida"
}
```

Status aceitos: `pendente`, `em andamento` e `concluida`.

### Excluir atividade

`DELETE /api/atividades/1`

A rota retorna uma mensagem de confirmação e os dados da atividade excluída.

## Códigos HTTP

- **200 OK:** consulta, atualização ou exclusão realizada.
- **201 Created:** cadastro realizado.
- **400 Bad Request:** dados inválidos ou JSON malformado.
- **404 Not Found:** atividade ou rota não encontrada.

## Observações

Os registros são mantidos em arrays na memória. Por isso, os dados cadastrados são perdidos quando o servidor é reiniciado. Para uso em produção, seria necessário integrar um banco de dados e implementar outras medidas de segurança.

## Documentação da integração\n\nA documentação da arquitetura, do fluxo dos dados, das rotas e dos controles de qualidade está em [docs/arquitetura-integracao.md](docs/arquitetura-integracao.md).\n\n## Diagrama de classes

O arquivo `docs/diagrama-classes.puml` contém o diagrama em PlantUML.
