import { z } from "zod";
import { IBaseDataBase, zBaseDatabase } from "./IBaseDataBase";

export interface ITypeMaintenance extends IBaseDataBase {
  name: string;
}
export const zTypeMaintenance = zBaseDatabase.extend({
  name: z.string().optional(),
});
