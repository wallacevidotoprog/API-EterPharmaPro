import { IBaseDataBase } from "./IBaseDataBase";

export interface IStore extends  IBaseDataBase {
    filial: string;
    cnpj: string;
    name: string;
    address_id?: number;
    phone: string;
    email: string;
  }
  