import { IStore } from "../../Interface/db/IStore";
import { DbModel } from "../../models/DbModel";
import { BaseControllerClass } from "../BaseControllerClass";
import { OperationsDbClass } from "../OperationsDbClass";

export class StoreControllerClass extends BaseControllerClass<IStore> {
  protected dbModel = new DbModel<IStore>(
    new OperationsDbClass<IStore>("store")
  );
}
