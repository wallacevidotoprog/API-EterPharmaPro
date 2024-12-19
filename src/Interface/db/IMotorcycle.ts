import { z } from "zod";
import { IBaseDataBase, zBaseDatabase } from "./IBaseDataBase";

export interface IMotorcycle extends IBaseDataBase {
  store_id?: string | null;
  model: string;
  year: number;
}

export const zMotorcycle = zBaseDatabase.extend({
  store_id: z.string().optional(),
  model: z.string().optional(),
  year: z.number().optional(),
});
