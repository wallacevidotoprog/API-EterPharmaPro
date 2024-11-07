import { IDENT } from "./IDENT";
import { IFirebaseDb } from "./IFirebaseDb";

export interface IDeliveryInput extends IFirebaseDb {
  DATA?: number;
  CLIENTE_ID?: number;
  ENDERECO_ID?: number;
  TYPE_DELIVERY: IDENT;
}
