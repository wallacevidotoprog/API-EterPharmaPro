import { IAddress } from "../../Interface/db/IAddress";
import { DbModel } from "../../models/DbModel";
import { BaseControllerClass } from "../BaseControllerClass";
import { OperationsDbClass } from "../OperationsDbClass";

export class AddressControllerClass extends BaseControllerClass<IAddress> {
  protected dbModel = new DbModel<IAddress>(
    new OperationsDbClass<IAddress>("address")
  );
}
