import { z } from "zod";
import { IBaseDataBase, zBaseDatabase } from "./IBaseDataBase";

export interface IClientAddress extends IBaseDataBase {
  client_id?: string | null;
  address_id?: string | null;
}
export const zClientAddress = zBaseDatabase.extend({
  client_id: z.string().optional(),
  address_id: z.string().optional(),
})