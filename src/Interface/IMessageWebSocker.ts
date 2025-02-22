import { TypesReciverWebSocketEnum } from "../Enum/TypesReciverWebSocketEnum";
import { IUsers } from "./db/IUsers";

export interface IMessageWebSocker {
  type: TypesReciverWebSocketEnum;
  message?: string;
  id_msgprivete?: "msgprivete";
  user?: IUsers;
  data?: any;
  uid?: string;
  name?: string;
}
