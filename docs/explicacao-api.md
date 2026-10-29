# Explicação da API

A API de Gestão de Atividades Acadêmicas foi pensada para ajudar a organizar as disciplinas e as atividades de uma turma.

## Como funciona
A classe Disciplina guarda o nome da disciplina e o professor. A classe Atividade guarda o título, descrição, data de entrega, status e a disciplina relacionada.

Uma disciplina pode ter várias atividades, por isso existe uma relação de um para muitos entre Disciplina e Atividade.

## Métodos HTTP utilizados
- GET: consulta disciplinas ou atividades.
- POST: cadastra uma disciplina ou atividade.
- PATCH: altera o status de uma atividade.

## Respostas HTTP
A API usa códigos HTTP para mostrar o resultado da requisição. Por exemplo, 200 quando deu certo, 201 quando um cadastro foi criado, 400 quando os dados enviados estão incorretos e 404 quando a rota ou atividade não existe.

## O que já foi desenvolvido
Esta primeira parte contém as rotas principais para consultar, cadastrar e atualizar atividades. Os dados são guardados em arrays enquanto o servidor está ligado. Uma melhoria futura seria salvar os dados em um banco de dados.
