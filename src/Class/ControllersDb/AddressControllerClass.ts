import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { IAddress } from "../../Interface/db/IAddress";
import { DbModel } from "../../models/DbModel";
import { BaseControllerClass } from "../BaseControllerClass";
import { OperationsDbClass } from "../OperationsDbClass";

export class AddressControllerClass extends BaseControllerClass<IAddress> {
  protected nameTable: keyof PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  > = "address";
  protected dbModel = new DbModel<IAddress>(
    new OperationsDbClass<IAddress>("address")
  );
}
