import { IBaseDataBase } from "./IBaseDataBase";

export interface IDelivery extends IBaseDataBase {
  order_delivery_id?: number | null;
  user_id?: number | null;
  date: Date;
  motor_kilometers: number;
  date_completed: Date;
}
