import { clientWhereInput } from './../../../node_modules/.prisma/client/index.d';
import { query, Request, Response } from "express";
import { HttpStatus } from "../../Enum/HttpStatus";
import { IClientAddress } from "../../Interface/db/IClientAddress";
import { IClients } from "../../Interface/db/IClients";
import { IResponseBase } from "../../Interface/IResponseBase";
import { DbModel } from "../../models/DbModel";
import { BaseControllerClass } from "../BaseControllerClass";
import { OperationsDbClass } from "../OperationsDbClass";
import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export class ClientControllerClass extends BaseControllerClass<IClients> {
  protected nameTable: keyof PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = "client";

  
  public async qGET(req: Request, res: Response): Promise<void> {
    
    try {
      const { type, cod } = req.query as { type?: string; cod?: string };

      if (!cod || !type || !["rg", "cpf"].includes(type)) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: `Parâmetro '${req.query}' é inválido`,
          actionResult: false,
        } as IResponseBase<string>);
        return;
      }
      const whereClause = type === "rg" ? { rg: cod } : { cpf: cod };

      const result = await this.prisma.client.findFirst({ where: whereClause });

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
  protected nameTable: keyof PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = "client_address";
  protected dbModel = new DbModel<IClientAddress>(
    new OperationsDbClass<IClientAddress>("client_address")
  );
}
