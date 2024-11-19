import { IBaseDataBase } from "./IBaseDataBase";

export interface IClients extends IBaseDataBase{
    cpf?: string | null;
    rg?: string | null;
    name: string;
    phone: string;
}