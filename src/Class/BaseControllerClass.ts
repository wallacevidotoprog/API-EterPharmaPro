import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { HttpStatus } from "../Enum/HttpStatus";
import { IResponseBase } from "../Interface/IResponseBase";
import { z, ZodError } from "zod";

export abstract class BaseControllerClass<T> {
  protected prisma = new PrismaClient();

  private schema: z.ZodType<any>;  // Esquema Zod

  constructor(schema: z.ZodType<any>) {
    this.schema = schema;
  }

  protected nameTable!: keyof PrismaClient;

  protected async ValidateQueryZod(data: unknown): Promise<any> {
    try {
      return await this.schema.parseAsync(data); // Valida e transforma os dados
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Validation failed for ${this.nameTable.toString()}: ${JSON.stringify(error.errors)}`);
      }
      throw new Error("Unexpected error during validation");
    }
  }
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

  protected ValidateQuery(req: Request, res: Response): boolean {
    try {
      if (!req.query || Object.keys(req.query).length === 0) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: `Query é inválido`,
          actionResult: false,
        } as IResponseBase<string>);
        return false;
      }
      return true;
    } catch (error) {
      console.log("Error => ValidateQuery =>", error);
      return false;
    }
  }

  public async CREATE(req: Request, res: Response): Promise<void> {
    if (!this.VallidateBody(req, res)) return;

    try {
      const entity: T = req.body as T;

      const model: any = this.prisma[this.nameTable];

      if (!model || !("create" in model)) {
        throw new Error(
          `Método 'create' não encontrado para o modelo ${this.nameTable.toString()}`
        );
      }

     
      // if (existingEntity) {
      //   // Registro já existe, retorne um erro apropriado
      //   res.status(HttpStatus.CONFLICT).json({
      //     data: null,
      //     actionResult: false,
      //     message: "Registro já existe.",
      //   } as IResponseBase<null>);
      //   return;
      // }



      const result = await model.create({ data: entity });
      res.status(HttpStatus.CREATED).json({
        data: result?.id,
        actionResult: true,
      } as IResponseBase<number | null>);
      return;
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: error,
        actionResult: false,
      } as IResponseBase<typeof error>);
      return;
    }
  }

  public async UPDATE(req: Request, res: Response): Promise<void> {
    const id = this.ValidateParams(req, res, "id");
    if (!id || !this.VallidateBody(req, res)) return;
    try {
      const entity: T = req.body as T;
      const model: any = this.prisma[this.nameTable];
      if (!model || !("update" in model)) {
        throw new Error(
          `Método 'update' não encontrado para o modelo ${this.nameTable.toString()}`
        );
      }
      const result = await model.update({
        where: { id: Number(id) },
        data: entity,
      });
      res.status(HttpStatus.OK).json({
        actionResult: true,
      } as IResponseBase<typeof result>);
    } catch (error) {
    this.handleError(res, error);
  }
  }

  public async DELETE(req: Request, res: Response): Promise<void> {
    const id = this.ValidateParams(req, res, "id");
    if (!id) return;

    try {
      const model: any = this.prisma[this.nameTable];
      if (!model || !("delete" in model)) {
        throw new Error(
          `Método 'delete' não encontrado para o modelo ${this.nameTable.toString()}`
        );
      }
      const result = await model.delete({
        where: { id: Number(id) },
      });
      res.status(HttpStatus.OK).json({
        actionResult: true,
      } as IResponseBase<typeof result>);
    } catch (error) {
    this.handleError(res, error);
  }
  }

  //arrumar ou excluir
  public async GET(req: Request, res: Response): Promise<void> {

    const id = this.ValidateParams(req, res, "id");
    try {
      const model: any = this.prisma[this.nameTable];

      if (!model || !("findFirst" in model)) {
        throw new Error(
          `Método 'findUnique ' não encontrado para o modelo ${this.nameTable.toString()}`
        );
      }

      const query: Partial<T> = req.query as Partial<T>;

      //const whereCondition = this.buildWhereCondition(query);

      const result = await model.findFirst({
       // where: whereCondition,
      });
      res.status(HttpStatus.OK).json({
        data: result,
        actionResult: true,
      } as IResponseBase<typeof result>);
    } catch (error) {
    this.handleError(res, error);
  }
  }

  public async GETALL(req: Request, res: Response): Promise<void> {
    try {
      const model: any = this.prisma[this.nameTable];

      if (!model || !("findMany" in model)) {
        throw new Error(
          `Método 'findMany ' não encontrado para o modelo ${this.nameTable.toString()}`
        );
      }     
      
      const validatedData = await this.ValidateQueryZod(req.query);

      const result = await model.findMany({ where:validatedData });


      res.status(HttpStatus.OK).json({
        data: result,
        actionResult: true,
      } as IResponseBase<typeof result>);
    } catch (error) {
    this.handleError(res, error);
  }
  }
  public async UPSERT(req: Request, res: Response): Promise<void> {
    //POST /users/upsert?uniqueKey=email&uniqueValue=test@example.com
    if (!this.VallidateBody(req, res)) return;
  
    try {
      const entity: T = req.body as T;
  
      const model: any = this.prisma[this.nameTable];
      if (!model || !("upsert" in model)) {
        throw new Error(
          `Método 'upsert' não encontrado para o modelo ${this.nameTable.toString()}`
        );
      }
  
      const uniqueKey = req.query.uniqueKey as keyof T;
      const uniqueValue = req.query.uniqueValue;
  
      if (!uniqueKey || !uniqueValue) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "É necessário informar a chave única e o valor para o upsert.",
          actionResult: false,
        } as IResponseBase<string>);
        return;
      }
  
      const result = await model.upsert({
        where: { [uniqueKey]: uniqueValue }, // Condição de busca
        update: entity, // Dados para atualizar, se o registro existir
        create: entity, // Dados para criar, se o registro não existir
      });
  
      res.status(HttpStatus.OK).json({
        data: result,
        actionResult: true,
      } as IResponseBase<typeof result>);
    } catch (error) {
      this.handleError(res, error);
    }
  }
  private handleError(res: Response, error: unknown): void {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      data: error,
      actionResult: false,
    } as IResponseBase<typeof error>);
  }
}
