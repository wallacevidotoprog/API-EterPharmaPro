import { Query } from "./../../node_modules/mysql2/typings/mysql/index.d";
import mysql, { Pool } from "mysql2/promise";
import dotenv from "dotenv";
import { Connection } from "mysql2/promise";

dotenv.config();

let isConnected: boolean = false;
let connection: Pool | null = null;

async function connectToDatabase() {
  try {
    connection = await mysql.createPool({
      host: process.env.HOST,
      port: Number(process.env.PORT),
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      waitForConnections: true,
      //connectionLimit: 10, // Número máximo de conexões no pool
      //queueLimit: 0, // Sem limite para a fila de conexões
      //ssl: {
      //rejectUnauthorized: false,
      // ca: process.env.CA_CERT_PATH
      //   ? require("fs").readFileSync(process.env.CA_CERT_PATH)
      //   : undefined,
      //},
    });

    console.log(
      "\x1b[33m[MYSQL]\x1b[36m✅ Conexão com o MySQL conexões criado com sucesso."
    );
  } catch (error) {
    isConnected = false;
    console.error(
      "\x1b[33m[MYSQL]\x1b[36m❌ Erro ao conectar ao MySQL Database:",
      error
    );
  }
}
function getPool(): Pool {
  if (!connection) {
    throw new Error(
      "O pool de conexões não foi inicializado. Certifique-se de chamar `connectToDatabase()` antes de usá-lo."
    );
  }
  return connection;
}
(async () => {
  await connectToDatabase();
  const pool = getPool();
  try {
    if (connection != null) {
      isConnected=true;
      await pool.query("SET time_zone = 'America/Sao_Paulo'");
    }
  } catch (error) {
    console.error(
      "\x1b[33m[MYSQL-Command]\x1b[36m❌ Erro ao SET time_zone ao MySQL Database:",
     // error
    );
  }
  const [rows] = await pool.query("SELECT NOW()");
  const serverTime = new Date((rows as any)[0]["NOW()"]);
  console.log(
    "\x1b[33m[MYSQL-Command]\x1b[36mHora do servidor:",
    serverTime.toLocaleString("pt-BR")
  );
})();

process.on("SIGINT", async () => {
  console.log(
    "\x1b[33m[MYSQL-Command]\x1b[36m✅ Encerrando a conexão com o banco de dados..."
  );
  await connection?.end();
  process.exit();
});

export { connection, isConnected };
