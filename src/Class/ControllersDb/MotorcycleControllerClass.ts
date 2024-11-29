import { IMaintenanceMotor } from "../../Interface/db/IMaintenanceMotor";
import { IMotorcycle } from "../../Interface/db/IMotorcycle";
import { ITypeMaintenance } from "../../Interface/db/ITypeMaintenance";
import { DbModel } from "../../models/DbModel";
import { BaseControllerClass } from "../BaseControllerClass";
import { OperationsDbClass } from "../OperationsDbClass";

export class MotorcycleControllerClass extends BaseControllerClass<IMotorcycle> {
  protected dbModel = new DbModel<IMotorcycle>(
    new OperationsDbClass<IMotorcycle>("motorcycle")
  );
}
export class MotorcycleMaintenanceControllerClass extends BaseControllerClass<IMaintenanceMotor> {
  protected dbModel = new DbModel<IMaintenanceMotor>(
    new OperationsDbClass<IMaintenanceMotor>("maintenance_motor")
  );
}
export class MotorcycleTypeMintenanceControllerClass extends BaseControllerClass<ITypeMaintenance> {
  protected dbModel = new DbModel<ITypeMaintenance>(
    new OperationsDbClass<ITypeMaintenance>("type_maintenance")
  );
}
