import { z } from "zod";
import { IBaseDataBase, zBaseDatabase } from "./IBaseDataBase";

export interface IMaintenanceMotor extends IBaseDataBase {
  type_maintenance_id?: string | null;
  motorcycle_id?: string | null;
  date: Date;
  value: number;
  location?: string | null;
  photo_receipt?: string | null;
}
export const zMaintenanceMotor = zBaseDatabase.extend({
  type_maintenance_id: z.string().optional(),
  motorcycle_id: z.string().optional(),
  date: z.date().optional(),
  value: z.number().optional(),
  location: z.string().optional(),
  photo_receipt: z.string().optional()
})