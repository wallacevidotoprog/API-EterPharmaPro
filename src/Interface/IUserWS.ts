import { IUsers } from "./IUsers";

export interface IUserWS {
  UID: string;
  USER?: IUsers;
  WS: WebSocket | any;
}
