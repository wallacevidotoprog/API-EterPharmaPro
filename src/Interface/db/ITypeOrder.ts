import { z } from "zod";
import { IBaseDataBase, zBaseDatabase } from "./IBaseDataBase";

export interface ITypeOrder extends IBaseDataBase {
  name: string;
}
export const zTypeOrder = zBaseDatabase.extend({
  name: z.string().optional(),
});
