import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import { HttpStatus } from '../../Enum/HttpStatus';
import { IUsers, zUsers } from '../../Interface/db/IUsers';
import { ILoginUser } from '../../Interface/ILoginUser';
import { IResponseBase } from '../../Interface/IResponseBase';
import { AuthService } from '../../services/AuthService';
import { BaseControllerClass } from '../BaseControllerClass';

export class UsersControllerClass extends BaseControllerClass<IUsers> {
  protected nameTable: keyof PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = 'users';
  constructor() {
    super(zUsers);
  }
  public async VerifyUserExist(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body?.email || !req.body?.pass) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Login ou Senha não preenchidos.',
          actionResult: false,
        } as IResponseBase<null>);
        return;
      }

      const objReq: ILoginUser = req.body;
      const result: IUsers = (await this.prisma.users.findFirst({ where: { email: objReq.email } })) as IUsers;

      if (!result || result.stats === false) {
        res.status(HttpStatus.CONFLICT).json({
          message: !result
            ? 'Credenciais inválidas'
            : result.stats === false
            ? 'Usúario inativo'
            : 'Algo deu errado, consulte o Dev',
          actionResult: false,
        } as IResponseBase<null>);
        return;
      }
      if (result.pass) {
        const isPasswordValid = await AuthService.CryptPassCompare(objReq.pass, result.pass);
        if (!isPasswordValid) {
          res.status(HttpStatus.UNAUTHORIZED).json({
            message: 'Credenciais inválidas.',
            actionResult: false,
          } as IResponseBase<null>);
          return;
        }
      }
      res.cookie('authToken', await AuthService.GenerateToken(result), {
        httpOnly: true,
        secure: false,
        path: '/',
        maxAge: 8 * 60 * 60 * 1000,
      });
      res.status(HttpStatus.OK).json({
        message: 'Login bem-sucedido.',
        actionResult: true,
      } as IResponseBase<null>);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  public async GetAllUserDefault(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.prisma.users.findMany({
        select: { id: true, name: true, position: { select: { id: true, name: true } } },
      });
      res.status(HttpStatus.OK).json({
        data: users,
        actionResult: true,
      } as IResponseBase<typeof users>);
      return;
    } catch (error) {
      this.handleError(res,error)
    }
   
  }

  public async SING_TESTE(req: Request, res: Response): Promise<void> {}
}
