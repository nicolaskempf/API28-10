const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Garante que requisições sem corpo ou com JSON que não seja objeto
// sejam tratadas pelas validações das rotas, sem gerar erro interno.
app.use((req, res, next) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    req.body = {};
  }
  next();
});

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

const statusPermitidos = ["pendente", "em andamento", "concluida"];

function idValido(valor) {
  const id = Number(valor);
  return Number.isInteger(id) && id > 0;
}

function dataValida(data) {
  if (typeof data !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    return false;
  }

  const [ano, mes, dia] = data.split("-").map(Number);
  const dataObjeto = new Date(Date.UTC(ano, mes - 1, dia));

  return (
    dataObjeto.getUTCFullYear() === ano &&
    dataObjeto.getUTCMonth() === mes - 1 &&
    dataObjeto.getUTCDate() === dia
  );
}

app.get("/", (req, res) => {
  res.status(200).json({
    mensagem: "API de Gestão de Atividades Acadêmicas",
    rotas: [
      "GET /api/health",
      "GET e POST /api/disciplinas",
      "GET e POST /api/atividades",
      "GET /api/atividades/:id",
      "PATCH /api/atividades/:id/status",
      "DELETE /api/atividades/:id"
    ]
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/disciplinas", (req, res) => {
  res.status(200).json(disciplinas);
});

app.post("/api/disciplinas", (req, res) => {
  const nome = typeof req.body.nome === "string" ? req.body.nome.trim() : "";
  const professor = typeof req.body.professor === "string" ? req.body.professor.trim() : "";

  if (!nome || !professor) {
    return res.status(400).json({
      erro: "Informe nome e professor com valores válidos."
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
  if (!idValido(req.params.id)) {
    return res.status(400).json({ erro: "Informe um ID válido." });
  }

  const id = Number(req.params.id);
  const atividade = atividades.find((item) => item.id === id);

  if (!atividade) {
    return res.status(404).json({ erro: "Atividade não encontrada." });
  }

  return res.status(200).json(atividade);
});

app.post("/api/atividades", (req, res) => {
  const titulo = typeof req.body.titulo === "string" ? req.body.titulo.trim() : "";
  const descricao = typeof req.body.descricao === "string" ? req.body.descricao.trim() : "";
  const { dataEntrega, disciplinaId } = req.body;

  if (!titulo || !descricao || !dataEntrega || disciplinaId === undefined) {
    return res.status(400).json({
      erro: "Informe titulo, descricao, dataEntrega e disciplinaId."
    });
  }

  if (!dataValida(dataEntrega)) {
    return res.status(400).json({
      erro: "A dataEntrega deve ser uma data válida no formato AAAA-MM-DD."
    });
  }

  if (!idValido(disciplinaId)) {
    return res.status(400).json({ erro: "Informe um disciplinaId válido." });
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
  if (!idValido(req.params.id)) {
    return res.status(400).json({ erro: "Informe um ID válido." });
  }

  const id = Number(req.params.id);
  const { status } = req.body;
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

// Exclui uma atividade pelo ID.
app.delete("/api/atividades/:id", (req, res) => {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ erro: "Informe um ID válido." });
  }

  const id = Number(req.params.id);
  const indice = atividades.findIndex((item) => item.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: "Atividade não encontrada." });
  }

  const [atividadeRemovida] = atividades.splice(indice, 1);

  return res.status(200).json({
    mensagem: "Atividade excluída com sucesso.",
    atividade: atividadeRemovida
  });
});

// Trata erros de JSON inválido enviado pelo cliente.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ erro: "O JSON enviado é inválido." });
  }

  return next(err);
});

app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada." });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
