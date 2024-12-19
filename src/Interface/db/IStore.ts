import { z } from "zod";
import { IBaseDataBase, zBaseDatabase } from "./IBaseDataBase";

export interface IStore extends IBaseDataBase {
  filial: string;
  cnpj: string;
  name: string;
  address_id?: string;
  phone: string;
  email: string;
}
export const zStore = zBaseDatabase.extend({
  filial: z.string().optional(),
  cnpj: z.string().optional(),
  name: z.string().optional(),
  address_id: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
});
