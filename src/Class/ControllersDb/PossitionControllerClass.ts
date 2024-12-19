import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { IPosition, zPosition } from "../../Interface/db/IPosition";
import { BaseControllerClass } from "../BaseControllerClass";

export class PossitionControllerClass extends BaseControllerClass<IPosition> {
  protected nameTable: keyof PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  > = "position";
  constructor() {
    super(zPosition);
  }
}
