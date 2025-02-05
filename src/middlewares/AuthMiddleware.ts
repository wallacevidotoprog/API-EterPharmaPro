import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../Enum/HttpStatus';
import { IResponseBase } from '../Interface/IResponseBase';
import { JwtUtil } from '../utils/JwtUtil';

export class AuthMiddleware {
  public static Authenticate(req: Request, res: Response, next: NextFunction): any {
    const token = req.cookies?.authToken;
    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Não autenticado.',
        actionResult: false,
      } as IResponseBase<null>);
    }

    try {
      const decoded = JwtUtil.VerifyToken(token);
      req.auth = decoded;
      next();
    } catch (error) {
      return res.status(HttpStatus.FORBIDDEN).json({
        message: 'Token inválido ou expirado.',
        actionResult: false,
      } as IResponseBase<null>);
    }
  }
  public static eLogout(req: Request, res: Response, next: NextFunction): void {
    try {
      res.clearCookie('authToken', {
        httpOnly: true,
        path: '/', // Este deve corresponder ao path usado na criação
      });
      next();
    } catch (error) {
      res.status(HttpStatus.FORBIDDEN).json({ message: 'Token inválido ou expirado.' });
    }
  }

  public static async CheckPermission(user_id: string) {
    // const DbQuery = new OperationsDbClass<IUsers>("users");
    // const [user, _]: any = await connection?.query(
    //   DbQuery.GET({ id: user_id })
    // );
    // const users: IUsers = user[0];
  }
}
