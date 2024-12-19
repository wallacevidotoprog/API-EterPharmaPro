import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { IStore, zStore } from "../../Interface/db/IStore";
import { BaseControllerClass } from "../BaseControllerClass";

export class StoreControllerClass extends BaseControllerClass<IStore> {
  protected nameTable: keyof PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  > = "store";
  constructor() {
    super(zStore);
  }
}
