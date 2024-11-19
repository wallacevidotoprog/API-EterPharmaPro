import { IBaseDataBase } from "./IBaseDataBase";

export interface IOrderDelivery extends IBaseDataBase{
    user_id?: number | null;
    date: Date;
    client_id?: number | null;
    address_id?: number | null;
    type_order_id?: number | null;
    value: number;
}