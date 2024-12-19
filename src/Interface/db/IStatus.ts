import { z } from "zod";
import { IBaseDataBase, zBaseDatabase } from "./IBaseDataBase";

export interface IStatus extends IBaseDataBase {
  name?: string | null;
}
export const zStatus = zBaseDatabase.extend({
  name: z.string().optional(),
});
