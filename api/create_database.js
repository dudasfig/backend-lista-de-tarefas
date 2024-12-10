const fs = require("fs");
const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString:
    "postgresql://postgress:c0Gqm6CdULoIZahXR9KBIrAdZdDh3o45@dpg-ct5oh6e8ii6s73dklgn0-a/lista_tarefas",
  ssl: {
    rejectUnauthorized: false, // Desativa a verificação do certificado SSL
  },
});

const sqlFilePath = "../database/create_database.sql";
// Certifique-se de que o arquivo SQL está nesse caminho

const createDatabase = async () => {
  try {
    console.log("Conectando ao banco...");
    await client.connect();

    console.log("Executando o script SQL...");
    const sql = fs.readFileSync(sqlFilePath, "utf-8");
    await client.query(sql);

    console.log("Tabelas criadas com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabelas:", error.message);
  } finally {
    await client.end();
    console.log("Conexão encerrada.");
  }
};

createDatabase();
