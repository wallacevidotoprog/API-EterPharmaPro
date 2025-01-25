import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

let isConnected: boolean = false; 
const prisma = 
  process.env.SSL === "true"
    ? new PrismaClient({
        datasources: {
          db: {
            url: `${process.env.DATABASE_URL}?sslaccept=strict&sslcert=${process.env.SSL_CA}`,
          },
        },
      })
    : new PrismaClient();
 
(async () => {
  try {
    await prisma.$executeRaw`SELECT 1;`; 
    console.log("\x1b[33m[PRISMA]\x1b[36m✅ PRISMA CONNECTED.");
    isConnected = true;
    await prisma.$executeRaw`SET time_zone = '-03:00';`; 
    console.log("\x1b[33m[PRISMA]\x1b[36m✅ SET time_zone = '-03:00'");
    const result = await prisma.$queryRaw`SELECT CAST(NOW() AS CHAR) AS now;`;
    const serverTime = new Date((result as any)[0]["now"]);
      console.log(
        "\x1b[33m[MYSQL]\x1b[36m ✅ Hora do servidor:",
        serverTime.toLocaleString("pt-BR"));
    
  } catch (error) {
    console.log("\x1b[33m[PRISMA]\x1b[36m❌ Prisma erro:", error);
  }finally {
    await prisma.$disconnect();
  }
})();
export { isConnected, prisma };
