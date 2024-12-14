import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { IStore } from "../../Interface/db/IStore";
import { DbModel } from "../../models/DbModel";
import { BaseControllerClass } from "../BaseControllerClass";
import { OperationsDbClass } from "../OperationsDbClass";

export class StoreControllerClass extends BaseControllerClass<IStore> {
  protected nameTable: keyof PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  > = "store";
  protected dbModel = new DbModel<IStore>(
    new OperationsDbClass<IStore>("store")
  );
}
