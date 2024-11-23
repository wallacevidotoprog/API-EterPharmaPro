import { IBaseDataBase } from "./IBaseDataBase";

export interface IPositionPermissions extends IBaseDataBase {
  user_id: number;
  permissions_id: number;
}
