import bcrypt from "bcryptjs";
//usermodel
import { JwtUtil } from "../utils/JwtUtil";
import { IUsers } from "../Interface/IUsers";

export class AuthService {
  static async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create(email, hashedPassword);
  }
  public static async Login(obj: IUsers) {
    const user = await UserModel.findbyEmal(obj.NOME);
    if (!user || (await bcrypt.compare(obj.PASS, user, pass))) {
      throw new Error("Credenciais inválidas");
    }
    return JwtUtil.GenerateToken({ obj });
  }
}
