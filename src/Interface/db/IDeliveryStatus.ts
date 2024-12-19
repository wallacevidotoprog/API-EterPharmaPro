import { z } from "zod";
import { IBaseDataBase, zBaseDatabase } from "./IBaseDataBase";

export interface IDeliveryStatus extends IBaseDataBase {
  delivery_id?: string | null;
  status_id?: string | null;
}
export const zDeliveryStatus = zBaseDatabase.extend({
  delivery_id: z.string().optional(),
  status_id: z.string().optional(),
});
