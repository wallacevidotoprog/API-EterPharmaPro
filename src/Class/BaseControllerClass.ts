import { Request, Response } from "express";
import { HttpStatus } from "../Enum/HttpStatus";
import { IResponseBase } from "../Interface/IResponseBase";

export abstract class BaseControllerClass<T> {
  protected abstract dbModel: any;
  protected VallidateBody(req: Request, res: Response): boolean {
    try {
      if (
        !req.body ||
        typeof req.body !== "object" ||
        Object.keys(req.body).length === 0
      ) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "Corpo da requisição inválido",
          actionResult: false,
        } as IResponseBase<string>);
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  protected ValidateParams(
    req: Request,
    res: Response,
    paramName: string
  ): number | null {
    try {
      const param = req.params[paramName];
      if (!param) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: `Parâmetro '${paramName}' é inválido`,
          actionResult: false,
        } as IResponseBase<string>);
        return null;
      }
      return parseInt(param);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async CREATE(req: Request, res: Response): Promise<void> {
    if (!this.VallidateBody(req, res)) return;

    try {
      const entity: T = req.body as T;
      const result = await this.dbModel.INSERT(entity);
      res.status(HttpStatus.CREATED).json({
        actionResult: true,
      } as IResponseBase<typeof result>);
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: error,
        actionResult: false,
      } as IResponseBase<typeof error>);
    }
  }

  public async UPDATE(req: Request, res: Response): Promise<void> {
    const id = this.ValidateParams(req, res, "id");
    if (!id || !this.VallidateBody(req, res)) return;
    try {
      const entity: T = req.body as T;

      const result = await this.dbModel.UPDATE(entity, { id });
      res.status(HttpStatus.OK).json({
        actionResult: true,
      } as IResponseBase<typeof result>);
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: error,
        actionResult: false,
      } as IResponseBase<typeof error>);
    }
  }

  public async DELETE(req: Request, res: Response): Promise<void> {
    const id = this.ValidateParams(req, res, "id");
    if (!id) return;

    try {
      const result = await this.dbModel.DELETE({ id });
      res.status(HttpStatus.OK).json({
        actionResult: true,
      } as IResponseBase<typeof result>);
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: error,
        actionResult: false,
      } as IResponseBase<typeof error>);
    }
  }

  public async GET(req: Request, res: Response): Promise<void> {
    const id = this.ValidateParams(req, res, "id");
    if (!id) return;

    try {
      const result = await this.dbModel.GET({ id });
      res.status(HttpStatus.OK).json({
        data: result,
        actionResult: true,
      } as IResponseBase<typeof result>);
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: error,
        actionResult: false,
      } as IResponseBase<typeof error>);
    }
  }

  public async GETALL(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.dbModel.GETALL();
      res.status(HttpStatus.OK).json({
        data: result,
        actionResult: true,
      } as IResponseBase<typeof result>);
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: error,
        actionResult: false,
      } as IResponseBase<typeof error>);
    }
  }
}
