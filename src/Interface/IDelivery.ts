import { IFirebaseDb } from "./IFirebaseDb";

export interface IDelivery extends IFirebaseDb {
  USER_ID: number;
  DATE: string;
  VALUE: number;
  KM: number;
  STATS: number;
  DATE_COMPLETED: number;
}
