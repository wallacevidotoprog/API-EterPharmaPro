import { IUsers } from "./db/IUsers";

export interface IUserWS {
  UID: string;
  USER?: IUsers;
  WS: WebSocket | any;
}

