import { view_order } from './../../../node_modules/.prisma/client/index.d';
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import { HttpStatus } from "../../Enum/HttpStatus";
import { zAddress } from "../../Interface/db/IAddress";
import { zClients } from "../../Interface/db/IClients";
import { IDelivery, zDelivery } from "../../Interface/db/IDelivery";
import {
  IDeliveryStatus,
  zDeliveryStatus,
} from "../../Interface/db/IDeliveryStatus";
import {
  IOrderDelivery,
  zOrderDelivery,
} from "../../Interface/db/IOrderDelivery";
import { IStatus, zStatus } from "../../Interface/db/IStatus";
import { ITypeOrder, zTypeOrder } from "../../Interface/db/ITypeOrder";
import { IOrderDeliveryFull } from "../../Interface/IOrderDeliveryFull";
import { IResponseBase } from "../../Interface/IResponseBase";
import { BaseControllerClass } from "../BaseControllerClass";

export class DeliveryControllerClass extends BaseControllerClass<IDelivery> {
  protected nameTable: keyof PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  > = "delivery";
  constructor() {
    super(zDelivery);
  }
}
export class OrderDeliveryControllerClass extends BaseControllerClass<IOrderDelivery> {
  protected nameTable: keyof PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  > = "order_delivery";
    
  constructor() {
    super(zOrderDelivery);
  }
  public async CREATE(req: Request, res: Response): Promise<void> {
    if (req.query.type && req.query.type === "full") {
      try {
        const { order, client, address }: IOrderDeliveryFull = req.body;

        if (!client || !address) {
          res.status(HttpStatus.BAD_REQUEST).json({
            message: "Faltou inserir o cliente e/ou endereço",
            actionResult: false,
          } as IResponseBase<string>);
          return;
        }

        //CLIENTE
        const returnClient = await this.prisma.client.findFirst({
          where: {
            OR: [{ cpf: client.cpf }, { rg: client.rg }],
          },
        });

        if (returnClient) {
          order.client_id = returnClient.id;
        } else {
          const validatedData = await zClients.parseAsync(client);

          // @ts-ignore
          const returnClient = await this.prisma.client.create({
             // @ts-ignore
            data: validatedData,
          });
          if (returnClient) {
            order.client_id = returnClient.id;
          }
        }

        //ENDEREÇO
        const returnAddres = await this.prisma.address.findFirst({
          where: {
            OR: [{ cep: address.cep }, { number: address.number }],
          },
        });
        if (returnAddres) {
          order.address_id = returnAddres.id;
        } else {
          const validatedData = await zAddress.parseAsync(address);
         
          const returnAddres = await this.prisma.address.create({
             // @ts-ignore
            data: validatedData,
          });
          if (returnAddres) {
            order.address_id = returnAddres.id;
          }
        }

        //RELAÇAÕ CLIENTE ENDEREÇO
        const returnCE = await this.prisma.client_address.findFirst({
          where: {
            AND: [
              { client_id: order.client_id },
              { address_id: order.address_id },
            ],
          },
        });
        if (!returnCE) {
          const returnAddres = await this.prisma.client_address.create({
            data: {
              client_id: order.client_id,
              address_id: order.address_id,
            },
          });
        }

        //order.date = new Date(order.date);
        req.body = order;

        await super.CREATE(req, res);
      } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          data: error,
          actionResult: false,
        } as IResponseBase<typeof error>);
        return;
      }
    } else {
      await super.CREATE(req, res);
    }
  }

  public async GETVIEW(req: Request, res: Response): Promise<void>{
    try {
      const result = await this.prisma.view_order.findMany();



      res.status(HttpStatus.OK).json({
        data: result,
        actionResult: true,
      } as IResponseBase<typeof result>);
      
    } catch (error) {
      this.handleError(res, error);
    }



  }
}

export class DeliveryStatusControllerClass extends BaseControllerClass<IDeliveryStatus> {
  protected nameTable: keyof PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  > = "delivery_status";
  constructor() {
    super(zDeliveryStatus);
  }
}

export class StatusDeliveryControllerClass extends BaseControllerClass<IStatus> {
  protected nameTable: keyof PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  > = "status";
  constructor() {
    super(zStatus);
  }
}

export class TypeOrderDeliveryControllerClass extends BaseControllerClass<ITypeOrder> {
  protected nameTable: keyof PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  > = "type_order";
  constructor() {
    super(zTypeOrder);
  }
}
