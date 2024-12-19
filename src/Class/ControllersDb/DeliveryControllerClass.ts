import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
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
