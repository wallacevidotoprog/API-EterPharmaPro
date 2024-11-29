import { IDelivery } from "../../Interface/db/IDelivery";
import { IPosition } from "../../Interface/db/IPosition";
import { DbModel } from "../../models/DbModel";
import { BaseControllerClass } from "../BaseControllerClass";
import { OperationsDbClass } from "../OperationsDbClass";

export class PossitionControllerClass extends BaseControllerClass<IPosition> {
  protected dbModel = new DbModel<IPosition>(
    new OperationsDbClass<IPosition>("position")
  );
}
