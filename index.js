const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./models"); // Importando a conexão configurada no models/index.js

const app = express();
app.use(
  cors({
    origin: "*", // Permite qualquer origem (não recomendado em produção)
  })
);

app.use(bodyParser.json());

const tarefasRoutes = require("./api/tarefas");

// Rota raiz para verificar se o servidor está funcionando
app.get("/", (req, res) => {
  res.send("Backend Lista de Tarefas está funcionando!");
});

// Rotas de tarefas
app.use("/tarefas", tarefasRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
