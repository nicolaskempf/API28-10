# Explicação da API

A API de Gestão de Atividades Acadêmicas foi criada para organizar disciplinas e atividades de uma turma.

## Como funciona

A entidade **Disciplina** possui ID, nome e professor. A entidade **Atividade** possui ID, título, descrição, data de entrega, status e o ID da disciplina relacionada.

Uma disciplina pode possuir várias atividades, e cada atividade pertence a uma disciplina.

## Funcionalidades

- Consultar e cadastrar disciplinas.
- Consultar e cadastrar atividades.
- Buscar uma atividade pelo ID.
- Atualizar o status de uma atividade.
- Excluir uma atividade pelo ID.
- Verificar se a API está funcionando.

## Métodos HTTP

- **GET:** consulta dados.
- **POST:** cadastra dados.
- **PATCH:** altera o status de uma atividade.
- **DELETE:** exclui uma atividade.

## Validações

A API verifica campos obrigatórios, IDs válidos, existência da disciplina relacionada, formato e validade da data de entrega e os status permitidos. Também retorna mensagens de erro para JSON inválido, dados incorretos, atividades inexistentes e rotas não encontradas.

## Respostas HTTP

- **200:** operação realizada com sucesso.
- **201:** registro criado.
- **400:** dados enviados incorretos.
- **404:** atividade ou rota não encontrada.

## Limitação atual

Os dados são armazenados em arrays na memória e são perdidos quando o servidor é reiniciado. Uma evolução futura é utilizar um banco de dados para manter os registros salvos.
