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

  public async GETVIEW(req: Request, res: Response): Promise<void> {
    try {
      let whereCondition = {};

      if (req.query) {
        const { date } = req.query;
        if (date) {
          if (typeof date === "string") {
            const selectedDate = new Date(date.split("T")[0]);
            const startOfDay = new Date(selectedDate);
            startOfDay.setUTCHours(0, 0, 0, 0);

            const endOfDay = new Date(selectedDate);
            endOfDay.setUTCHours(23, 59, 59, 999);

            whereCondition = {
              date: {
                gte: startOfDay,
                lte: endOfDay,
              },
            };
          }
        }
      }

      const orders = await this.prisma.view_order.findMany({
        where: whereCondition,
      });

      if (orders.length === 0) {
        res.status(HttpStatus.OK).json({
          data: [],
          actionResult: true,
        } as IResponseBase<typeof orders>);
        return;
      }

      const orderIds = orders
        .map((order) => order.id)
        .filter(Boolean) as string[];

      const deliveries = await this.prisma.delivery.findMany({
        where: { order_delivery_id: { in: orderIds } },
      });

      const deliveryIds = deliveries
        .map((delivery) => delivery.id)
        .filter(Boolean) as string[];

      const deliveryStatuses = await this.prisma.delivery_status.findMany({
        where: { delivery_id: { in: deliveryIds } },
        select: {
          id: true,
          status_id: true,
          createAt: true,
          delivery_id: true,
        },
      });

      const statusIds = deliveryStatuses
        .map((status) => status.status_id)
        .filter(Boolean) as string[];

      const statuses = await this.prisma.status.findMany({
        where: { id: { in: statusIds } },
        select: { id: true, name: true },
      });

      const enrichedOrders = orders.map((order) => {
        const delivery = deliveries.find(
          (d) => d.order_delivery_id === order.id
        );
        const deliveryStatus = deliveryStatuses.find(
          (ds) => ds.delivery_id === delivery?.id
        );

        const status = statuses.filter(
          (s) => s.id === deliveryStatus?.status_id
        );
        const statusMap = new Map(statuses.map((s) => [s.id, s]));

        const result: any = { order };

        if (delivery) {
          result.delivery = delivery;
        }

        if (status.length > 0) {
          //result.status = status;
          result.status = deliveryStatuses
            .map((deliveryStatus) => {
              if (!deliveryStatus.status_id) return null;

              const status = statusMap.get(deliveryStatus.status_id);
              return status
                ? {
                    name:status.name,
                    create: deliveryStatus.createAt, 
                  }
                : null;
            })
            .filter(Boolean);
        }

        return result;
      });

      res.status(HttpStatus.OK).json({
        data: enrichedOrders,
        actionResult: true,
      } as IResponseBase<typeof enrichedOrders>);
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
