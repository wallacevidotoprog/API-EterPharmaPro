import { IClientAddress } from "../../Interface/db/IClientAddress";
import { IClients } from "../../Interface/db/IClients";
import { DbModel } from "../../models/DbModel";
import { BaseControllerClass } from "../BaseControllerClass";
import { OperationsDbClass } from "../OperationsDbClass";

export class ClientControllerClass extends BaseControllerClass<IClients> {
  protected dbModel = new DbModel<IClients>(
    new OperationsDbClass<IClients>("client")
  );
}

export class ClientAddressControllerClass extends BaseControllerClass<IClientAddress> {
  protected dbModel = new DbModel<IClientAddress>(
    new OperationsDbClass<IClientAddress>("client_address")
  );
}
