import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { IAddress, zAddress } from "../../Interface/db/IAddress";
import { BaseControllerClass } from "../BaseControllerClass";

export class AddressControllerClass extends BaseControllerClass<IAddress> {
  protected nameTable: keyof PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  > = "address";
  constructor() {
    super(zAddress);
  }
}
