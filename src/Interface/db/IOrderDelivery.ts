import { z } from "zod";
import { IBaseDataBase, zBaseDatabase } from "./IBaseDataBase";

export interface IOrderDelivery extends IBaseDataBase{
    user_id?: string ;
    date: Date;
    client_id?: string ;
    address_id?: string ;
    type_order_id?: string ;
    value: number;
}

export const zOrderDelivery = zBaseDatabase.extend({
    user_id: z.string().optional(),
    //date: z.date().optional(),
    date: z.preprocess((arg) => {
        if (typeof arg === 'string') {
          const date = new Date(arg);
          return isNaN(date.getTime()) ? undefined : date;
        }
        return arg;
      }, z.date()),
    client_id: z.string().optional(),
    address_id: z.string().optional(),
    type_order_id: z.string().optional(),
    value: z.number().optional(),
});