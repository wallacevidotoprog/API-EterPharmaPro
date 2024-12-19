import { z } from "zod";
import { IBaseDataBase, zBaseDatabase } from "./IBaseDataBase";
export interface IUsers extends IBaseDataBase{
  store_id?: string ;
  email?: string;
  phone?: string;
  pass?: string;
  name?: string;
  position_id?: string ;
  permissions_id ?: string;
  stats?: boolean;
}
export const zUsers = zBaseDatabase.extend({
  store_id: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  pass: z.string().optional(),
  name: z.string().optional(),
  position_id: z.string().optional(),
  permissions_id: z.string().optional(),
  stats: z.boolean().optional(),
});