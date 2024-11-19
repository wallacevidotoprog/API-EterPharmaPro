import { IBaseDataBase } from "./IBaseDataBase";

export interface IClientAddress extends IBaseDataBase {
  client_id?: number | null;
  address_id?: number | null;
}
