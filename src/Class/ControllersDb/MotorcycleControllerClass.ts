import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import {
  IMaintenanceMotor,
  zMaintenanceMotor,
} from "../../Interface/db/IMaintenanceMotor";
import { IMotorcycle, zMotorcycle } from "../../Interface/db/IMotorcycle";
import {
  ITypeMaintenance,
  zTypeMaintenance,
} from "../../Interface/db/ITypeMaintenance";
import { BaseControllerClass } from "../BaseControllerClass";

export class MotorcycleControllerClass extends BaseControllerClass<IMotorcycle> {
  protected nameTable: keyof PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  > = "motorcycle";
  constructor() {
    super(zMotorcycle);
  }
}
export class MotorcycleMaintenanceControllerClass extends BaseControllerClass<IMaintenanceMotor> {
  protected nameTable: keyof PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  > = "maintenance_motor";
  constructor() {
    super(zMaintenanceMotor);
  }
}
export class MotorcycleTypeMintenanceControllerClass extends BaseControllerClass<ITypeMaintenance> {
  protected nameTable: keyof PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  > = "type_maintenance";
  constructor() {
    super(zTypeMaintenance);
  }
}
