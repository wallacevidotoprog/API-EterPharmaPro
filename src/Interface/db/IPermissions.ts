import { z } from "zod";
import { IBaseDataBase, zBaseDatabase } from "./IBaseDataBase";

export interface IPermissions extends IBaseDataBase {
  name: string;
}
export const zPermissions = zBaseDatabase.extend({
  name: z.string().optional()
});