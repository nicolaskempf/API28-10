const { spawn } = require("node:child_process");
const { setTimeout: delay } = require("node:timers/promises");
const { before, after, test } = require("node:test");
const assert = require("node:assert/strict");

const port = 3100 + Math.floor(Math.random() * 1000);
const baseUrl = `http://127.0.0.1:${port}`;
let server;

before(async () => {
  server = spawn(process.execPath, ["src/server.js"], {
    env: { ...process.env, PORT: String(port) },
    stdio: "ignore"
  });

  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const response = await fetch(`${baseUrl}/api/health`);
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {}
    await delay(250);
  }

  assert.equal(ready, true, "A API não iniciou dentro do tempo esperado.");
});

after(() => {
  if (server && !server.killed) server.kill();
});

test("health check retorna status ok", async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("consulta disciplinas e atividades iniciais", async () => {
  const disciplinas = await fetch(`${baseUrl}/api/disciplinas`);
  const atividades = await fetch(`${baseUrl}/api/atividades`);
  assert.equal(disciplinas.status, 200);
  assert.equal(atividades.status, 200);
  assert.ok((await disciplinas.json()).length >= 1);
  assert.ok((await atividades.json()).length >= 1);
});

test("cadastra disciplina e atividade, atualiza status e exclui", async () => {
  const disciplinaResponse = await fetch(`${baseUrl}/api/disciplinas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome: "Teste automatizado", professor: "Professor Teste" })
  });
  assert.equal(disciplinaResponse.status, 201);
  const disciplina = await disciplinaResponse.json();

  const atividadeResponse = await fetch(`${baseUrl}/api/atividades`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      titulo: "Atividade de teste",
      descricao: "Verificação automatizada",
      dataEntrega: "2026-12-15",
      disciplinaId: disciplina.id
    })
  });
  assert.equal(atividadeResponse.status, 201);
  const atividade = await atividadeResponse.json();

  const atualizacao = await fetch(`${baseUrl}/api/atividades/${atividade.id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "concluida" })
  });
  assert.equal(atualizacao.status, 200);
  assert.equal((await atualizacao.json()).status, "concluida");

  const exclusao = await fetch(`${baseUrl}/api/atividades/${atividade.id}`, {
    method: "DELETE"
  });
  assert.equal(exclusao.status, 200);
});

test("rejeita cadastro sem corpo e data inválida", async () => {
  const semCorpo = await fetch(`${baseUrl}/api/disciplinas`, { method: "POST" });
  assert.equal(semCorpo.status, 400);

  const dataInvalida = await fetch(`${baseUrl}/api/atividades`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      titulo: "Teste",
      descricao: "Data inválida",
      dataEntrega: "2026-02-30",
      disciplinaId: 1
    })
  });
  assert.equal(dataInvalida.status, 400);
});

test("retorna 404 para rota inexistente e atividade não encontrada", async () => {
  const rota = await fetch(`${baseUrl}/rota-inexistente`);
  const atividade = await fetch(`${baseUrl}/api/atividades/99999`);
  assert.equal(rota.status, 404);
  assert.equal(atividade.status, 404);
});
