import mysql, { Pool } from "mysql2/promise";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

let isConnected: boolean = false;
let connection: Pool | null = null;
const prisma = new PrismaClient();

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
      ///ssl: {
      ///   ca:process.env.DB_CA_CERT,
      // ca: process.env.CA_CERT_PATH
      //   ? require("fs").readFileSync(process.env.CA_CERT_PATH)
      //   : undefined,
      /// },
    });
  } catch (error) {
    isConnected = false;
    console.error("\x1b[33m[MYSQL]\x1b[36m❌ Erro ao criar createPool:", error);
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
  await connectToDatabase()
    .then(async (data) => {
      isConnected = true;
      console.log(
        "\x1b[33m[MYSQL]\x1b[36m✅ Conexão com o MySQL conexões criado com sucesso."
      );
      const pool = getPool();
      // await pool
      //   .query("SET time_zone = 'America/Sao_Paulo'")
      //   .then((data) => {console.log(data);
      //   })
      //   .catch((error) => {
      //     console.error(
      //       "\x1b[33m[MYSQL-Command]\x1b[36m❌ Erro ao SET time_zone ao MySQL Database:",
      //       error.sqlMessage
      //     );
      //   });
      const [rows] = await pool.query("SELECT NOW()");
      const serverTime = new Date((rows as any)[0]["NOW()"]);
      console.log(
        "\x1b[33m[MYSQL-Command]\x1b[36mHora do servidor:",
        serverTime.toLocaleString("pt-BR")
      );
    })
    .catch((error) => {
      isConnected = false;
      console.error(
        "\x1b[33m[MYSQL]\x1b[36m❌ Erro ao conectar ao MySQL Database:",
        error
      );
    });
    checkePrisma();


    console.log('agora',Date());
    
})();

process.on("SIGINT", async () => {
  console.log(
    "\x1b[33m[MYSQL-Command]\x1b[36m✅ Encerrando a conexão com o banco de dados..."
  );
  await connection?.end();
  process.exit();
});

async function checkePrisma() {
  try {
    const result = await prisma.client.findFirst({ where: { cpf: '00000000000' } });
    if (result) {
      console.log("\x1b[33m[PRISMA]\x1b[36m✅ Prisma ok",);      
    }
  } catch (error) {
    console.log("\x1b[33m[PRISMA]\x1b[36m❌ Prisma erro",error);
  } finally {
    await prisma.$disconnect();

  }
}
export { connection, isConnected };
