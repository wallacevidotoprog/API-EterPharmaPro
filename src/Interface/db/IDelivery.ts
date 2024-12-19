import { z } from "zod";
import { IBaseDataBase, zBaseDatabase } from "./IBaseDataBase";

export interface IDelivery extends IBaseDataBase {
  order_delivery_id?: string | null;
  user_id?: string | null;
  date: Date;
  motor_kilometers: number;
  date_completed: Date;
}
export const zDelivery = zBaseDatabase.extend({
  order_delivery_id: z.string().optional(),
  user_id: z.string().optional(),
  date: z.string().optional(),
  motor_kilometers: z.number().optional(),
  date_completed: z.date().optional()
})