import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { Connection } from "mysql2/promise";

dotenv.config();

let isConnected: boolean = false;
let connection: Connection| null = null;;

async function connectToDatabase() {
  try {
    connection = await mysql.createConnection({
      host: process.env.HOST,
      port: Number(process.env.PORT),
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      ssl: {
        rejectUnauthorized: false,
        // ca: process.env.CA_CERT_PATH
        //   ? require("fs").readFileSync(process.env.CA_CERT_PATH)
        //   : undefined,
      },
    });

    isConnected = true;
    console.log(
      "\x1b[33m[MYSQL]\x1b[36m✅ Conexão com o MySQL Database estabelecida com sucesso."
    );
  } catch (error) {
    isConnected = false;
    console.error(
      "\x1b[33m[MYSQL]\x1b[36m❌ Erro ao conectar ao MySQL Database:",
      error
    );
  }
}

(async () => {
  await connectToDatabase();

  if (connection) {
    await connection.query("SET time_zone = 'America/Sao_Paulo'")
    const [rows] = await connection.query("SELECT NOW()");
    const serverTime = new Date(rows[0]["NOW()"]);
    console.log(
      "\x1b[33m[MYSQL]\x1b[36mHora do servidor:",
      serverTime.toLocaleString("pt-BR")
    );
  }
})();

export { connection, isConnected };
