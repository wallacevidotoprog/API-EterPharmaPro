import { ResponseDeliveryEnum } from "../Enum/ResponseDeliveryEnum";

export interface IResponseDelivery{
    type: ResponseDeliveryEnum;
    table:string
    IDF?:string
    data?:any

}