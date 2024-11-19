import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class JwtUtil {
  private static JWT_SECRET = process.env.JWT;

  public static GenerateToken(payload: object, expiresIn: string = "1h") {
    if (!this.JWT_SECRET) {
      throw new Error("JWT_SECRET não está definido");
    }
    return jwt.sign(payload, this.JWT_SECRET, { expiresIn });
  }

  public static  VerifyToken(token: string) {
    if (!this.JWT_SECRET) {
      throw new Error("JWT_SECRET não está definido");
    }
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch (error) {
      throw new Error("Token inválido ou expirado");
    }
  }
}
