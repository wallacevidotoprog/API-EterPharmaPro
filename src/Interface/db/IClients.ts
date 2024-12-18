import { IBaseDataBase } from "./IBaseDataBase";

export interface IClients extends IBaseDataBase{
    cpf?: string;
    rg?: string;
    name?: string;
    phone?: string;
}