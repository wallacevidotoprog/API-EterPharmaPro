import { IBaseDataBase } from "./db/IBaseDataBase";

export interface IUsersResp extends IBaseDataBase{
    store_id?: number | null;
    email: string;
    phone: string;
    name: string;
    position_id?: number | null;
    permissions_id ?: number | null;
    stats: boolean;
}