import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { getBrasiliaTime } from '../utils/globais';


dotenv.config();
process.env.TZ = 'America/Sao_Paulo';
let isConnected: boolean = false;
const prisma =
  process.env.SSL === 'true'
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
    console.log('\x1b[33m[PRISMA]\x1b[36m✅ PRISMA CONNECTED.');
    isConnected = true;
    await prisma.$executeRaw`SET GLOBAL  time_zone = '-3:00';`;
    console.log("\x1b[33m[PRISMA]\x1b[36m✅ SET GLOBAL  time_zone = '-3:00'");
    const result = await prisma.$queryRaw`SELECT CAST(NOW() AS CHAR) AS now;`;
    const serverTime = new Date((result as any)[0]['now']);
    console.log('\x1b[33m[MYSQL]\x1b[36m ✅ Hora do servidor:', serverTime.toLocaleString('pt-BR'));
  } catch (error) {
    console.log('\x1b[33m[PRISMA]\x1b[36m❌ Prisma erro:', error);
  } finally {
    await prisma.$disconnect();
  }  
  prisma.$use(async (params, next) => {
    
    const brasilTime = getBrasiliaTime();
    
    
    if (params.action === 'create') {
      params.args.data.createAt = brasilTime;
      params.args.data.updateAt = brasilTime;
    }
    
    if (params.action === 'update') {
      params.args.data.updateAt = brasilTime;
    }
  
    return next(params);
  });
})();

export { isConnected, prisma };
