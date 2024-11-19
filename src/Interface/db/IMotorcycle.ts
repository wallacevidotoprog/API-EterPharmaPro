import { IBaseDataBase } from "./IBaseDataBase";

export interface IMotorcycle extends IBaseDataBase {
  store_id?: number | null;
  model: string;
  year: number;
}
