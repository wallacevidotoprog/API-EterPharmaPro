import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import { HttpStatus } from '../../Enum/HttpStatus';
import { zAddress } from '../../Interface/db/IAddress';
import { zClients } from '../../Interface/db/IClients';
import { IDelivery, zDelivery } from '../../Interface/db/IDelivery';
import { IDeliveryStatus, zDeliveryStatus } from '../../Interface/db/IDeliveryStatus';
import { IOrderDelivery, zOrderDelivery } from '../../Interface/db/IOrderDelivery';
import { IStatus, zStatus } from '../../Interface/db/IStatus';
import { ITypeOrder, zTypeOrder } from '../../Interface/db/ITypeOrder';
import { IDeliveryReq } from '../../Interface/IDeliveryReq';
import { IOrderDeliveryFull } from '../../Interface/IOrderDeliveryFull';
import { IResponseBase } from '../../Interface/IResponseBase';
import { Logger } from '../../logger/logger';
import { BaseControllerClass } from '../BaseControllerClass';

export class DeliveryControllerClass extends BaseControllerClass<IDelivery> {
  protected nameTable: keyof PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = 'delivery';
  constructor() {
    super(zDelivery);
  }

  public async CREATE(req: Request, res: Response): Promise<void> {
    try {
      if (req.query.type && req.query.type === 'colleted-all') {
        const tempBody: IDeliveryReq = req.body;

        if (!tempBody || !tempBody.order_delivery_id || !tempBody.status_id) {
          res.status(HttpStatus.BAD_REQUEST).json({
            message: 'Faltou inserir o delivery e/ou status',
            actionResult: false,
          } as IResponseBase<string>);
          return;
        }

        const processOrderDelivery = async (element: string) => {
          const existingDelivery = await this.prisma.delivery.findFirst({
            where: { order_delivery_id: element },
          });

          if (
            await this.prisma.order_delivery.findFirst({
              where: { id: element },
            })
          ) {
            if (existingDelivery) {
              const new_delivery_status = await this.prisma.delivery_status.create({
                data: {
                  delivery_id: existingDelivery.id,
                  status_id: tempBody.status_id,
                },
              });
              return `new_delivery_status:${new_delivery_status.id}`;
            } else {
              const newDelivery = await this.prisma.delivery.create({
                data: {
                  date: tempBody.date,
                  motor_kilometers: tempBody.motor_kilometers,
                  user_id: tempBody.user_id,
                  order_delivery_id: element,
                } as IDelivery,
              });

              if (newDelivery) {
                (await this.prisma.delivery_status.create({
                  data: {
                    delivery_id: newDelivery.id,
                    status_id: tempBody.status_id,
                  },
                })) as IDeliveryStatus;

                return `newDelivery:${newDelivery.id}`;
              }

              return 'ERRO CREATE: newDelivery & delivery_status';
            }
          }
          res.status(HttpStatus.BAD_REQUEST).json({
            data: 'Order not exist' + element,
            actionResult: false,
          } as IResponseBase<string>);
          return 'Order not exist';
        };

        const deliverysIds = await Promise.all(tempBody.order_delivery_id.map((id) => processOrderDelivery(id)));

        res.status(HttpStatus.CREATED).json({
          data: deliverysIds,
          actionResult: true,
        } as IResponseBase<string[]>);
      } else {
        await super.CREATE(req, res);
      }
    } catch (error) {
      this.handleError(res, error);
      return;
    }
  }
}
export class OrderDeliveryControllerClass extends BaseControllerClass<IOrderDelivery> {
  protected nameTable: keyof PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = 'order_delivery';

  constructor() {
    super(zOrderDelivery);
  }

  public async CREATE(req: Request, res: Response): Promise<void> {
    if (req.query.type && req.query.type === 'full') {
      try {
        const { order, client, address }: IOrderDeliveryFull = req.body;

        if (!client || !address) {
          res.status(HttpStatus.BAD_REQUEST).json({
            message: 'Faltou inserir o cliente e/ou endereço',
            actionResult: false,
          } as IResponseBase<string>);
          return;
        }

        //CLIENTE
        const returnClient = await this.prisma.client.findFirst({
          where: {
            //cpf: client.cpf,
             OR: [{ cpf: client.cpf }, { c_interno: client.c_interno }],
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
            AND: [{ client_id: order.client_id }, { address_id: order.address_id }],
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
        req.body = order;
        await super.CREATE(req, res);
      } catch (error) {
        this.handleError(res, error);
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
          if (typeof date === 'string') {
            const selectedDate = new Date(date.split('T')[0]);
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

      const ordertts = await this.prisma.order_delivery.findMany({
        where: whereCondition,
        include: {
          delivery: {
            include: {
              delivery_status: {
                include: {
                  status: { select: { id: true, name: true, createAt: true } },
                },
              },
            },
          },
          client: {
            select: {
              name: true,
              cpf: true,
              c_interno: true,
              phone: true,
            },
          },
          address: true,
          type_order: {
            select: { id: true, name: true },
          },
          user: {
            select: { name: true },
          },
        },
      });
      
      const orders_result = ordertts.map((item) => ({ order: { ...item } }));

      res.status(HttpStatus.OK).json({
        data: orders_result,
        actionResult: true,
      } as IResponseBase<typeof orders_result>);
      return;
    } catch (error) {
      this.handleError(res, error);
    }
  }
}

export class DeliveryStatusControllerClass extends BaseControllerClass<IDeliveryStatus> {
  protected nameTable: keyof PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = 'delivery_status';
  constructor() {
    super(zDeliveryStatus);
  }
}

export class StatusDeliveryControllerClass extends BaseControllerClass<IStatus> {
  protected nameTable: keyof PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = 'status';
  constructor() {
    super(zStatus);
  }
}

export class TypeOrderDeliveryControllerClass extends BaseControllerClass<ITypeOrder> {
  protected nameTable: keyof PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = 'type_order';
  constructor() {
    super(zTypeOrder);
  }
}
