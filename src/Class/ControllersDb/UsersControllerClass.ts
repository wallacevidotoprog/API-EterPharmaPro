import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { IUsers, zUsers } from "../../Interface/db/IUsers";
import { BaseControllerClass } from "../BaseControllerClass";
import { Request, Response } from "express";
import { HttpStatus } from "../../Enum/HttpStatus";
import { IResponseBase } from "../../Interface/IResponseBase";
import { ILoginUser } from "../../Interface/ILoginUser";
import { AuthService } from "../../services/AuthService";

export class UsersControllerClass extends BaseControllerClass<IUsers> {
  protected nameTable: keyof PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  > = "users";
  constructor() {
    super(zUsers);
  }
  public async VerifyUserExist(req: Request,res:Response): Promise<void>{
    try {
      if (!req.body?.email || !req.body?.pass) {
            res.status(HttpStatus.BAD_REQUEST).json({
              message: 'Login ou Senha não preenchidos.',
              actionResult: false,
            } as IResponseBase<null>);
            return;
          }
      
          const objReq: ILoginUser = req.body;
          const result:IUsers = await this.prisma.users.findFirst({where:{email:objReq.email}}) as IUsers   

          if (!result) {
            res.status(401).json({
              message: 'Credenciais inválidas.',
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
            maxAge: 3600000,
          });
          res.status(HttpStatus.OK).json({
            message: 'Login bem-sucedido.',
            actionResult: true,
          } as IResponseBase<null>);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  public async SING_TESTE(req: Request,res:Response): Promise<void>{

  }

}
