import bcrypt from "bcryptjs";
import { JwtUtil } from "../utils/JwtUtil";
import { IUsers } from "../Interface/db/IUsers";

export class AuthService {
  public static async CryptPass(pass: string): Promise<string> {
    
    return await bcrypt.hash(pass, 10);
  }
  
  public static async GenerateToken(obj: IUsers) {
    const jwtNew = {
      id: obj.id,
      email: obj.email,
      name: obj.name,
    };
    return JwtUtil.GenerateToken({ jwtNew });
  }

  public static async CryptPassCompare(passReq: string, passServe: string) {
    
    return await bcrypt.compare(passReq, passServe);
  }
}
