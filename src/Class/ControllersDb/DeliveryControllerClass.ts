import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { IDelivery } from "../../Interface/db/IDelivery";
import { IDeliveryStatus } from "../../Interface/db/IDeliveryStatus";
import { IOrderDelivery } from "../../Interface/db/IOrderDelivery";
import { IStatus } from "../../Interface/db/IStatus";
import { ITypeOrder } from "../../Interface/db/ITypeOrder";
import { DbModel } from "../../models/DbModel";
import { BaseControllerClass } from "../BaseControllerClass";
import { OperationsDbClass } from "../OperationsDbClass";

export class DeliveryControllerClass extends BaseControllerClass<IDelivery> {
  protected nameTable: keyof PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = "delivery";
  protected dbModel = new DbModel<IDelivery>(
    new OperationsDbClass<IDelivery>("delivery")
  );
}
export class OrderDeliveryControllerClass extends BaseControllerClass<IOrderDelivery> {
  protected nameTable: keyof PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = "order_delivery";
  protected dbModel = new DbModel<IOrderDelivery>(
    new OperationsDbClass<IOrderDelivery>("order_delivery")
  );
}

export class DeliveryStatusControllerClass extends BaseControllerClass<IDeliveryStatus> {
  protected nameTable: keyof PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = "delivery_status";
  protected dbModel = new DbModel<IDeliveryStatus>(
    new OperationsDbClass<IDeliveryStatus>("delivery_status")
  );
}

export class StatusDeliveryControllerClass extends BaseControllerClass<IStatus> {
  protected nameTable: keyof PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = "status";
  protected dbModel = new DbModel<IStatus>(
    new OperationsDbClass<IStatus>("status")
  );
}

export class TypeOrderDeliveryControllerClass extends BaseControllerClass<ITypeOrder> {
  protected nameTable: keyof PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = "type_order";
  protected dbModel = new DbModel<ITypeOrder>(
    new OperationsDbClass<ITypeOrder>("type_order")
  );
}
