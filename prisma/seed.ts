import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.users.deleteMany({});
  await prisma.type_order.deleteMany({});
  await prisma.status.deleteMany({});

  console.log('SEED INSERT');
  

  // Inserir dados na tabela `status`
  await prisma.status.createMany({
    data: [
      { id: 'da8a0959-c963-11ef-9551-a01d48b9c273', name: 'AGUARDANDO' },
      { id: 'da8a12a2-c963-11ef-9551-a01d48b9c274', name: 'INICIADO' },
      { id: 'da8a2091-c963-11ef-9551-a01d48b9c275', name: 'COLETADO' },
      { id: 'da8aee7d-c963-11ef-9551-a01d48b9c276', name: 'EM ROTA' },
      { id: 'da8af0ce-c963-11ef-9551-a01d48b9c277', name: 'FINALIZADO' },
      { id: 'da8af146-c963-11ef-9551-a01d48b9c278', name: 'CANCELADO' },
    ],
  });

  // Inserir dados na tabela `type_order`
  await prisma.type_order.createMany({
    data: [
      { id: '2a5b8c21-b7e9-4e1d-8e57-91d3e31a0e54', name: 'COM TAXA' },
      { id: '3f6d2b17-d8fc-47f3-903b-c26f8b7c6a12', name: 'SEM TAXA' },
      { id: '4b9e1c84-ff47-45c8-90c4-19d4a10e5b6c', name: 'IFOOD' },
      { id: '5a7f2e95-df18-4b1a-a6d1-64e3f12c8b99', name: 'CONVÊNIO' },
      { id: '6c4d3b29-cfc1-463f-8d7f-85a9b72f6a1d', name: 'MANIPULADO' },
      { id: 'd8d30725-4b37-4e32-b72c-ccece53a1e5f', name: 'PADRAO' },
    ],
  });

  // Inserir dados na tabela `users`
  await prisma.users.create({
    data: {
      id: '900c3c93-cc38-4a55-aca3-b20e3881c015',
      
      email: 'wallacevidoto@gmail.com',
      phone: '17991983774',
      pass: '$2a$10$SOuNAXdWMFvzAg70ylJ2oOwAdvyMZscrfL47WdqDRPcSjvjpxmnDu',
      name: 'Wallace Vidoto',
      position_id: '0',
      stats: true,
    },
  });
  } catch (error) {
    console.error('SEED',error)
  }
  
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
