const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let disciplinas = [
  { id: 1, nome: "Desenvolvimento Web", professor: "Professor da disciplina" }
];

let atividades = [
  {
    id: 1,
    titulo: "Atividade de API",
    descricao: "Criar uma parte de uma API REST",
    dataEntrega: "2026-11-10",
    status: "pendente",
    disciplinaId: 1
  }
];

let proximoIdDisciplina = 2;
let proximoIdAtividade = 2;

app.get("/", (req, res) => {
  res.status(200).json({
    mensagem: "API de Gestão de Atividades Acadêmicas",
    rotas: ["/api/health", "/api/disciplinas", "/api/atividades"]
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/disciplinas", (req, res) => {
  res.status(200).json(disciplinas);
});

app.post("/api/disciplinas", (req, res) => {
  const { nome, professor } = req.body;

  if (!nome || !professor) {
    return res.status(400).json({
      erro: "Informe nome e professor."
    });
  }

  const disciplina = {
    id: proximoIdDisciplina++,
    nome,
    professor
  };

  disciplinas.push(disciplina);
  return res.status(201).json(disciplina);
});

app.get("/api/atividades", (req, res) => {
  res.status(200).json(atividades);
});

app.get("/api/atividades/:id", (req, res) => {
  const id = Number(req.params.id);
  const atividade = atividades.find((item) => item.id === id);

  if (!atividade) {
    return res.status(404).json({ erro: "Atividade não encontrada." });
  }

  return res.status(200).json(atividade);
});

app.post("/api/atividades", (req, res) => {
  const { titulo, descricao, dataEntrega, disciplinaId } = req.body;

  if (!titulo || !descricao || !dataEntrega || disciplinaId === undefined) {
    return res.status(400).json({
      erro: "Informe titulo, descricao, dataEntrega e disciplinaId."
    });
  }

  const idDisciplina = Number(disciplinaId);
  const disciplinaExiste = disciplinas.some((item) => item.id === idDisciplina);

  if (!disciplinaExiste) {
    return res.status(400).json({
      erro: "A disciplina informada não existe."
    });
  }

  const atividade = {
    id: proximoIdAtividade++,
    titulo,
    descricao,
    dataEntrega,
    status: "pendente",
    disciplinaId: idDisciplina
  };

  atividades.push(atividade);
  return res.status(201).json(atividade);
});

app.patch("/api/atividades/:id/status", (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;
  const statusPermitidos = ["pendente", "em andamento", "concluida"];

  const atividade = atividades.find((item) => item.id === id);

  if (!atividade) {
    return res.status(404).json({ erro: "Atividade não encontrada." });
  }

  if (!statusPermitidos.includes(status)) {
    return res.status(400).json({
      erro: "Status inválido. Use: pendente, em andamento ou concluida."
    });
  }

  atividade.status = status;
  return res.status(200).json(atividade);
});

app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada." });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
