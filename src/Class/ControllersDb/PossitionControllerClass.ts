import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { IPosition } from "../../Interface/db/IPosition";
import { DbModel } from "../../models/DbModel";
import { BaseControllerClass } from "../BaseControllerClass";
import { OperationsDbClass } from "../OperationsDbClass";

export class PossitionControllerClass extends BaseControllerClass<IPosition> {
  protected nameTable: keyof PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  > = "position";
  protected dbModel = new DbModel<IPosition>(
    new OperationsDbClass<IPosition>("position")
  );
}
