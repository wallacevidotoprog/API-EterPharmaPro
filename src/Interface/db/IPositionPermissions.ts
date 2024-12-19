import { z } from "zod";
import { IBaseDataBase, zBaseDatabase } from "./IBaseDataBase";

export interface IPositionPermissions extends IBaseDataBase {
  user_id: string;
  permissions_id: string;
}
export const zPositionPermissions = zBaseDatabase.extend({
  user_id: z.string().optional(),
  permissions_id: z.string().optional(),
});
