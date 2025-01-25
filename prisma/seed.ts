import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.users.deleteMany({});
    await prisma.type_order.deleteMany({});
    await prisma.status.deleteMany({});

    await prisma.address.create({
      data: {
        id: '43623874-bd4b-4ba2-b950-da2bd36ec7e3',
        place: 'Avenida Fortunato Ernesto Vetorasso',
        number: '550',
        cep: '15040300',
        city: 'Sao Jose do Rio Preto',
        uf: 'SP',
        neighborhood: 'Jardim Residencial Vetorasso'
      }
    });    
    
    await prisma.store.create({
      data: {
        id: '45139b18-7f98-486f-952b-a0aa25ea401a',
        name: 'REDE CENTRAL COMERCIO DE PRODUTOS FARMACEUTICOS LTDA',
        cnpj: '68873694000105',
        filial: 'LOJA 15',
        address_id: '43623874-bd4b-4ba2-b950-da2bd36ec7e3',
        email: 'CENTRAL@redecentral.com',
        phone: '170000000'
      }
    });

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

    await prisma.position.createMany({
      data: [
        { id: '5190e6a0-5e33-4458-8f7d-316ef9293011', name: 'DEV' },
        { id: '6d78b6c3-3c2a-4f8b-8b78-fc0d5df5f3e1', name: 'ADMINISTRADOR(A)' },
        { id: '8c77d3b9-d29c-441c-b8c6-28a3e6d8c90d', name: 'SUPERVISOR(A)' },
        { id: 'af22c6d1-5b19-4b28-b3b7-f1b0f40ad8cf', name: 'GERENTE' },
        { id: 'c3fdad62-7f12-4864-b1e7-8df0df90b324', name: 'FARMACEUTICO(A)' },
        { id: 'ef6cb8d5-219a-4c82-8824-975bfe1b9242', name: 'BALCONISTA' },
        { id: '90c66e24-8417-48c2-a8ed-9f9bb8f81683', name: 'OPERADOR DE CAIXA' },
        { id: '5e9e64a7-842d-4f5f-a236-9a9b963bb4fa', name: 'OPERADOR DE LOJA' },
        { id: 'a712dc90-5b39-4fc3-944d-cdc923e9c4c2', name: 'PERFUMISTA' },
        { id: '36f4e9cd-d7e4-4b27-9f6f-8df0eaacb133', name: 'ENTREGADOR(A)' },
        { id: 'b2a4f6ad-7c24-4e99-b6b7-a0c5f9321f54', name: 'FREELANCER/ENTREGADOR' },
      ],
    });

    await prisma.users.createMany({
      data: [
        {
          id: '93e32301-409e-4592-aa71-70d3fe7f5694',
          email: 'gabriel@gmail.com',
          phone: '17991983774',
          pass: '$2a$10$SOuNAXdWMFvzAg70ylJ2oOwAdvyMZscrfL47WdqDRPcSjvjpxmnDu', // Senha já criptografada
          name: 'Gabriel',
          position_id: '36f4e9cd-d7e4-4b27-9f6f-8df0eaacb133',
          stats: true,
          store_id: '45139b18-7f98-486f-952b-a0aa25ea401a',
        },
        {
          id: '900c3c93-cc38-4a55-aca3-b20e3881c015',
          email: 'wallacevidoto@gmail.com',
          phone: '17991983774',
          pass: '$2a$10$SOuNAXdWMFvzAg70ylJ2oOwAdvyMZscrfL47WdqDRPcSjvjpxmnDu',
          name: 'Wallace Vidoto',
          position_id: '36f4e9cd-d7e4-4b27-9f6f-8df0eaacb133',
          stats: true,
          store_id: '45139b18-7f98-486f-952b-a0aa25ea401a',
        },
        {
          id: 'f1a7c58d-b0de-4977-bc6e-7e61ec872879',
          email: 'laisa@gmail.com',
          phone: '17998883774',
          pass: '$2a$10$YO2kU53msuY9TkMJH3zXYe8B3g9EDbq5f9jlfp3lhbqjxlET4c8AmG',
          name: 'Laisa Santos',
          position_id: 'af22c6d1-5b19-4b28-b3b7-f1b0f40ad8cf',
          stats: true,
          store_id: '45139b18-7f98-486f-952b-a0aa25ea401a',
        },
        {
          id: 'e7b6cf3d-b848-472f-b846-b9f1b051ff2a',
          email: 'naiara@gmail.com',
          phone: '17999983774',
          pass: '$2a$10$0UR14sjYvqK2LCwvvrcOrfoyVV0Mn2CZ8WoVOvYmhUIr7rHX1w17C',
          name: 'Naiara Rodrigues',
          position_id: 'c3fdad62-7f12-4864-b1e7-8df0df90b324',
          stats: true,
          store_id: '45139b18-7f98-486f-952b-a0aa25ea401a',
        },
        {
          id: 'b6f3b12e-cf7e-4e5f-8e56-8d53b349f2a1',
          email: 'bruno@gmail.com',
          phone: '17996683774',
          pass: '$2a$10$Q0WGVZrMkmMkQm8oPksXPeHLU5nlLO8mbGvZaFOZ7j3bNJbiSCgB7u',
          name: 'Bruno',
          position_id: 'ef6cb8d5-219a-4c82-8824-975bfe1b9242',
          stats: true,
          store_id: '45139b18-7f98-486f-952b-a0aa25ea401a',
        },
        {
          id: 'c923f34f-1ff3-4c3e-bd77-c2ef4a72589f',
          email: 'adilson@gmail.com',
          phone: '17994483774',
          pass: '$2a$10$hjC9hn3wz95Qvcs7r0AIVkmcfKwz9yNK7pLe5J6MwEtoOmjLy/dAW',
          name: 'Adilson Belmonte',
          position_id: 'c3fdad62-7f12-4864-b1e7-8df0df90b324',
          stats: true,
          store_id: '45139b18-7f98-486f-952b-a0aa25ea401a',
        },
        {
          id: 'd423e81e-2f58-4df4-9f61-4f90b42e4909',
          email: 'amalri@gmail.com',
          phone: '17992283774',
          pass: '$2a$10$s5MNfAFvH5Bnp.vpK6BhCyyBkBgA6jx1kfmCqcqz9czXQJfaTpvGS',
          name: 'Amalri Santos',
          position_id: 'ef6cb8d5-219a-4c82-8824-975bfe1b9242',
          stats: true,
          store_id: '45139b18-7f98-486f-952b-a0aa25ea401a',
        },
      ],
    });
    

    console.log('SEED INSERT');
  } catch (error) {
    console.error('SEED', error);
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
