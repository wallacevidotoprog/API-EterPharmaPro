import { IAddress } from "./db/IAddress";
import { IClients } from "./db/IClients";
import { IOrderDelivery } from "./db/IOrderDelivery";

export interface IOrderDeliveryFull {
  order: IOrderDelivery;
  client: IClients;
  address: IAddress;
}
