import bcrypt from "bcryptjs";
import { JwtUtil } from "../utils/JwtUtil";
import { IUsers } from "../Interface/db/IUsers";
import { OperationsDbClass } from "../Class/OperationsDbClass";
import { IPermissions } from "../Interface/db/IPermissions";
import { IPositionPermissions } from "../Interface/db/IPositionPermissions";
import { IPermissionsUser } from "../Interface/IPermissionsUser";

export class AuthService {
  public static async CryptPass(pass: string): Promise<string> {
    try {
      return await bcrypt.hash(pass, 10);
    } catch (error) {
      throw new Error("Erro ao criptografar senha.");
    }
  }

  public static async GenerateToken(obj: IUsers): Promise<string> {
    try {
      const jwtNew = {
        id: obj.id,
        email: obj.email,
        name: obj.name,
        //permissions: await this.SetPermissions(obj.id) || [], //#Implementar
      };      
      return JwtUtil.GenerateToken({ jwtNew });
    } catch (error) {
      throw new Error("Erro ao gerar token JWT.");
    }
  }

  public static async CryptPassCompare(
    passReq: string,
    passServe: string
  ): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(passReq, passServe);
      return isMatch;
    } catch (error) {
      return false;
    }
  }

  public static async VerifyToken(tk: string) {
    try {
      return JwtUtil.VerifyToken(tk);
    } catch (error) {
      throw new Error("Erro ao verifucar token JWT.");
    }
  }

  // private static async SetPermissions(
  //   user_id?: number
  // ): Promise<IPermissionsUser| any> {
  //   const DbQueryUser = new OperationsDbClass<IUsers>("users");
  //   const DbQueryPermission = new OperationsDbClass<IPermissions>(
  //     "permissions"
  //   );
  //   const DbQueryPermissions = new OperationsDbClass<IPositionPermissions>(
  //     "position_permissions"
  //   );

  //   const [user, _]: any = await connection?.query(
  //     // @ts-ignore
  //     DbQueryUser.GET({ id: user_id })
  //   );
  //   const users: IUsers = user[0];

  //   if (users != null) {
  //     const [_permissions, _]: any = await connection?.query(
  //       DbQueryPermissions.GET({ user_id: users.id })
  //     );

  //     const _positionPermissions: IPositionPermissions[] = _permissions;

  //     if (_positionPermissions != null && _positionPermissions.length > 0) {

  //       let temp : IPermissionsUser={
  //         permissions:[]
  //       };

  //       for (let index = 0; index < _positionPermissions.length; index++) {
  //         const element = _positionPermissions[index];
  //         const [_permissions, _]: any = await connection?.query(
  //           DbQueryPermission.GET({ id: element.permissions_id })
  //         );
  //         const permissions: IPermissions = user[0];

  //         temp.permissions.push(permissions)
  //       }

  //      return temp
  //     }
  //   }
  // }
}
