import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { HttpStatus } from "../Enum/HttpStatus";
import { IResponseBase } from "../Interface/IResponseBase";

export abstract class BaseControllerClass<T> {
  protected prisma = new PrismaClient();

  protected nameTable!: keyof PrismaClient;
  protected model: any = this.prisma[this.nameTable];

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
    if (!this.ValidateQuery(req, res)) return;

    try {
      const entity: T = req.body as T;

      const model: any = this.prisma[this.nameTable];

      if (!model || !("create" in model)) {
        throw new Error(
          `Método 'create' não encontrado para o modelo ${this.nameTable.toString()}`
        );
      }
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
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: error,
        actionResult: false,
      } as IResponseBase<typeof error>);
    }
  }

  public async GET(req: Request, res: Response): Promise<void> {

    throw new Error('Method old.');
    const id = this.ValidateParams(req, res, "id");
    try {
      const model: any = this.prisma[this.nameTable];

      if (!model || !("findUnique" in model)) {
        throw new Error(
          `Método 'findUnique ' não encontrado para o modelo ${this.nameTable.toString()}`
        );
      }

      const query: Partial<T> = req.query as Partial<T>;

      //const whereCondition = this.buildWhereCondition(query);

      const result = await model.findUnique({
       // where: whereCondition,
      });
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
      const model: any = this.prisma[this.nameTable];

      if (!model || !("findMany" in model)) {
        throw new Error(
          `Método 'findMany ' não encontrado para o modelo ${this.nameTable.toString()}`
        );
      }
      //const query: Partial<T> = req.query as Partial<T>;

      

      //const whereCondition = this.buildWhereCondition(query);

      //console.log(whereCondition);

      const result = await model.findMany({  });
      const filters = req.query as Partial<Record<keyof typeof result, any>>;
      const filteredUsers = this.applyFilters(result, filters);


      res.status(HttpStatus.OK).json({
        data: filteredUsers,
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

  private applyFilters<T>(data: T[], filters: Partial<Record<keyof T, any>>): T[] {
    return data.filter(item =>
      Object.entries(filters).every(([key, value]) => {
        // Verifica se o valor é igual ou contém (para strings)
        if (typeof value === 'string' && typeof item[key as keyof T] === 'string') {
          return (item[key as keyof T] as unknown as string)
            .toLowerCase()
            .includes(value.toLowerCase());
        }
  
        // Comparação estrita para outros tipos
        return item[key as keyof T] == value; // "==" permite comparar string e número
      })
    );
  }
  // private convertValueToType(value: any): any {
  //   console.log("entrada", value);
  //   if (!isNaN(Number(value))) {
  //     console.log("isNaN(Number(value)):", value);
  //     return Number(value);
  //   } else if (value === "true" || value === "false") {
  //     console.log("true||false:", value);
  //     return value === "true" ? true : false;
  //   }
  //   // switch (false) {
  //   //   case "number":
  //   //     return isNaN(Number(value)) ? undefined : Number(value);
  //   //   case "boolean":
  //   //     return value === "true" ? true : value === "false" ? false : undefined;
  //   //   case "object":
  //   //     return !isNaN(Date.parse(value)) ? new Date(value) : undefined;
  //   //   case "string":
  //   //     return String(value);
  //   //   default:
  //   //     return value;
  //   // }
  // }
  // private buildWhereCondition(query: Partial<T>): Prisma.clientWhereInput {
  //   const whereCondition: Prisma.clientWhereInput = {};

  //   for (const [key, value] of Object.entries(query)) {
  //     // Se o valor for nulo ou indefinido, ignora
  //     if (value == null) continue;
  //     console.log("buildWhereCondition", value, typeof value);

  //     // Converte o valor para o tipo adequado
  //     whereCondition[key as keyof Prisma.clientWhereInput] =
  //       this.convertValueToType(key, value);
  //   }

  //   return whereCondition;
  // }

  // private convertValueToType(field: string, value: any): any {
  //   // Aqui você pode usar o schema para pegar o tipo do campo, mas vamos simplificar
  //   switch (typeof value) {
  //     case "string":
  //       if (field.endsWith("Id")) {
  //         return parseInt(value, 10); // Considerando que ids sejam numéricos
  //       }
  //       return value.trim(); // Para strings, remove espaços extras
  //     // case 'boolean':
  //     //   return value === 'true'; // Converte 'true' ou 'false' para booleano
  //     case "number":
  //       return value; // Se for número, mantém o valor
  //     default:
  //       return value;
  //   }
  // }
}
