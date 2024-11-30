const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Lê a URL do banco de dados da variável de ambiente
  ssl: process.env.DATABASE_URL.includes("localhost")
    ? false // Sem SSL para localhost
    : { rejectUnauthorized: false }, // Necessário para conexões seguras no Render
});

(async () => {
  try {
    const client = await pool.connect();
    console.log("Conexão com o banco de dados foi estabelecida com sucesso.");
    client.release();
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);
    process.exit(1);
  }
})();

module.exports = pool;
