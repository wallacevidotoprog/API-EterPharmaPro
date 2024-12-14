import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { IMaintenanceMotor } from "../../Interface/db/IMaintenanceMotor";
import { IMotorcycle } from "../../Interface/db/IMotorcycle";
import { ITypeMaintenance } from "../../Interface/db/ITypeMaintenance";
import { DbModel } from "../../models/DbModel";
import { BaseControllerClass } from "../BaseControllerClass";
import { OperationsDbClass } from "../OperationsDbClass";

export class MotorcycleControllerClass extends BaseControllerClass<IMotorcycle> {
  protected nameTable: keyof PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = "motorcycle";
  protected dbModel = new DbModel<IMotorcycle>(
    new OperationsDbClass<IMotorcycle>("motorcycle")
  );
}
export class MotorcycleMaintenanceControllerClass extends BaseControllerClass<IMaintenanceMotor> {
  protected nameTable: keyof PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = "maintenance_motor";
  protected dbModel = new DbModel<IMaintenanceMotor>(
    new OperationsDbClass<IMaintenanceMotor>("maintenance_motor")
  );
}
export class MotorcycleTypeMintenanceControllerClass extends BaseControllerClass<ITypeMaintenance> {
  protected nameTable: keyof PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = "type_maintenance";
  protected dbModel = new DbModel<ITypeMaintenance>(
    new OperationsDbClass<ITypeMaintenance>("type_maintenance")
  );
}
