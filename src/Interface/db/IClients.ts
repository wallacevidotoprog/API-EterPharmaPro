import { z } from "zod";
import { IBaseDataBase, zBaseDatabase } from "./IBaseDataBase";

export interface IClients extends IBaseDataBase{
    cpf?: string;
    rg?: string;
    name?: string;
    phone?: string;
}

export const zClients = zBaseDatabase.extend({
    cpf: z.string().optional(),
    rg: z.string().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
})