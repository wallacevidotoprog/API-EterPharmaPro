import bcrypt from "bcryptjs";
import { JwtUtil } from "../utils/JwtUtil";
import { IUsers } from "../Interface/db/IUsers";

export class AuthService {
  public static async CryptPass(pass: string): Promise<string> {
    try {
      return await bcrypt.hash(pass, 10);
    } catch (error) {
      throw new Error("Erro ao criptografar senha.");
    }
  }

  public static async GenerateToken(obj: IUsers) : Promise<string>{
    try {
      const jwtNew = {
        id: obj.id,
        email: obj.email,
        name: obj.name,
        //roles: obj.roles || [], #Implementar
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

  public static async VerifyToken(tk:string){
    try {
      return JwtUtil.VerifyToken(tk);
    } catch (error) {
      throw new Error("Erro ao verifucar token JWT.");
    }
  }
}
