import { IDelivery } from "../../Interface/db/IDelivery";
import { DbModel } from "../../models/DbModel";
import { BaseControllerClass } from "../BaseControllerClass";
import { OperationsDbClass } from "../OperationsDbClass";

export class DeliveryControllerClass extends BaseControllerClass<IDelivery> {
  protected dbModel = new DbModel<IDelivery>(
    new OperationsDbClass<IDelivery>("delivery")
  );
}
