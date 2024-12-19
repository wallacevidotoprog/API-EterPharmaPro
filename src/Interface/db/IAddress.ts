import { z } from "zod";
import { IBaseDataBase, zBaseDatabase } from "./IBaseDataBase";

export interface IAddress extends IBaseDataBase {
    cep?: string;
    place: string;
    number: string;
    neighborhood: string;
    city: string;
    uf: string;
  }

export const zAddress = zBaseDatabase.extend({
  cep: z.string().optional(),
  place: z.string().optional(),
  number: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  uf: z.string().optional(),
})
  