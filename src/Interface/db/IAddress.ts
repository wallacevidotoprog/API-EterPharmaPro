import { IBaseDataBase } from "./IBaseDataBase";

export interface IAddress extends IBaseDataBase {
    cep?: string;
    place: string;
    number: string;
    neighborhood: string;
    city: string;
    uf: string;
  }
  