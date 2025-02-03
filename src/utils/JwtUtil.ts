import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Logger } from "../logger/logger";
import { getBrasiliaTime } from './globais'
dotenv.config();

export class JwtUtil {
  private static JWT_SECRET = process.env.JWT;

  public static GenerateToken(payload: object) {
    
    if (!this.JWT_SECRET) {
      throw new Error("JWT_SECRET não está definido");
    }
    const brasilTime = getBrasiliaTime();
    const tk = jwt.sign(payload, this.JWT_SECRET, { expiresIn: 8 * 60 * 60 });
    // @ts-ignore
    console.log(new Date(jwt.decode(tk)?.exp * 1000));
    console.log('brasilTime',brasilTime);
    
    return tk;
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
