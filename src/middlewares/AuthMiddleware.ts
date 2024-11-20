import { Request, Response, NextFunction } from "express";
import { JwtUtil } from "../utils/JwtUtil";

export class AuthMiddleware {
  static Authenticate(req: Request, res: Response, next: NextFunction):void {
    const token = req.cookies.authToken;

    if (!token) {
      res.status(401).json({ message: "Não autenticado." });
    }

    try {
      const decoded = JwtUtil.VerifyToken(token);
      req.body.user = decoded; // Adicionar o usuário ao request
      next();
    } catch (error) {
      res.status(403).json({ message: "Token inválido ou expirado." });
    }
  }
}
