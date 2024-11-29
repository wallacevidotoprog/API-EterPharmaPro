import { IBaseDataBase } from "./IBaseDataBase";

export interface IDeliveryStatus extends IBaseDataBase {
  delivery_id?: number | null;
  status_id?: number | null;
}
