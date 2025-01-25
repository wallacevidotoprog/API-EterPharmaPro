import { z } from "zod";
import { IBaseDataBase, zBaseDatabase } from "./IBaseDataBase";

export interface IClients extends IBaseDataBase{
    cpf?: string;
    c_interno?: string;
    name?: string;
    phone?: string;
}

export const zClients = zBaseDatabase.extend({
    cpf: z.string().optional(),
    c_interno: z.string().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
})