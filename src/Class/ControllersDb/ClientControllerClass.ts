import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import { HttpStatus } from '../../Enum/HttpStatus';
import { IClientAddress, zClientAddress } from '../../Interface/db/IClientAddress';
import { IClients, zClients } from '../../Interface/db/IClients';
import { IResponseBase } from '../../Interface/IResponseBase';
import { BaseControllerClass } from '../BaseControllerClass';

export class ClientControllerClass extends BaseControllerClass<IClients> {
  protected nameTable: keyof PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = 'client';

  constructor() {
    super(zClients);
  }

  public async qGET(req: Request, res: Response): Promise<void> {
    try {
      

      const { cpf, c_interno } = req.query as { cpf?: string; c_interno?: string };

      if (!cpf && !c_interno) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: `Parâmetro '${req.query}' é inválido`,
          actionResult: false,
        } as IResponseBase<string>);
        return;
      }
 
      
     
      const whereClause = c_interno ? { c_interno: c_interno } : { cpf: cpf };
      
      const result = await this.prisma.client.findFirst  ({
        where: whereClause,        
        select: { cpf:true,c_interno:true,id:true,phone:true,name:true,  client_address: { select: { address: true } } },
      });
     
      console.log('result',result);
      

      if (!result) {
        res.status(HttpStatus.NOT_FOUND).json({
          actionResult: false,
        } as IResponseBase<typeof undefined>);
        return;
      }
      res.status(HttpStatus.OK).json({
        data: result,
        actionResult: true,
      } as IResponseBase<typeof result>);
      return;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: error,
        actionResult: false,
      } as IResponseBase<typeof error>);
      return;
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

export class ClientAddressControllerClass extends BaseControllerClass<IClientAddress> {
  protected nameTable: keyof PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = 'client_address';
  constructor() {
    super(zClientAddress);
  }
}
