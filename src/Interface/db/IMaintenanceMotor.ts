import { IBaseDataBase } from "./IBaseDataBase";

export interface IMaintenanceMotor extends IBaseDataBase {
  type_maintenance_id?: number | null;
  motorcycle_id?: number | null;
  date: Date;
  value: number;
  location?: string | null;
  photo_receipt?: string | null;
}
