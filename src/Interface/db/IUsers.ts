import { IBaseDataBase } from "./IBaseDataBase";

export interface IUsers extends IBaseDataBase{
  store_id?: number | null;
  email: string;
  phone: string;
  pass: string;
  name: string;
  position_id?: number | null;
  permissions_id ?: number | null;
  stats: boolean;
}