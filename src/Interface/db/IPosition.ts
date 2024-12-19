import { z } from "zod";
import { IBaseDataBase, zBaseDatabase } from "./IBaseDataBase";

export interface IPosition extends IBaseDataBase {
  name: string;
}
export const zPosition = zBaseDatabase.extend({
  name: z.string().optional(),
});
