import { Request, Response, NextFunction } from "express";
import { JwtUtil } from "../utils/JwtUtil";

export class AuthMiddleware {
  static authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: "Não autenticado." });
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
