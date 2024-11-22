import { Request, Response, NextFunction } from "express";
import { JwtUtil } from "../utils/JwtUtil";

export class AuthMiddleware {
  public static Authenticate(req: Request, res: Response, next: NextFunction):void {
    const token = req.cookies?.authToken;
    if (!token) {
      res.status(401).json({ message: "Não autenticado." });
    }

    try {
      const decoded = JwtUtil.VerifyToken(token);
      req.body.auth = decoded;       
      next();
    } catch (error) {
      res.status(403).json({ message: "Token inválido ou expirado." });
    }
  }
  public static eLogout(req: Request, res: Response, next: NextFunction):void {
    try {
      res.clearCookie("authToken", {
        httpOnly: true,
        path: "/", // Este deve corresponder ao path usado na criação
      });      
      next();
    } catch (error) {
      res.status(403).json({ message: "Token inválido ou expirado." });
    }
  }
}
