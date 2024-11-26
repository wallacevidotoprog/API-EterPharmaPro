import { OperationsDbClass } from "../Class/OperationsDbClass";
import { TableMapper } from "../Class/TableMapperClass";
import { connection } from "../DatabaseMySql/DataBaseMySql";
import { IBaseDataBase } from "../Interface/db/IBaseDataBase";

export class DbModel<T extends object> {
  private DbQuery: OperationsDbClass<T>;
  constructor(operations: OperationsDbClass<T>) {
    this.DbQuery = operations;
  }
  public async INSERT(model: T) {
    try {
      return await connection?.query(this.DbQuery.INSERT(model));
    } catch (error) {
      console.warn(error);
    }
  }
  public async UPDATE(model: T, cond: Partial<T>): Promise<boolean> {
    try {
      await connection?.query(this.DbQuery.UPDATE(model, cond));
      return true;
    } catch (error) {
      console.warn(error);
      return false;
    }
  }
  public async DELETE(model: T) {
    try {
      await connection?.query(this.DbQuery.DELETE(model));
    } catch (error) {
      console.warn(error);
    }
  }

  public async GET(condition: Partial<T>) {
    try {
      const [rows, _]: any = await connection?.query(
        this.DbQuery.GET(condition)
      );
      return rows;
    } catch (error) {
      console.warn(error);
    }
  }
  public async GETALL() {
    try {
      await connection?.query(this.DbQuery.GETALL());
    } catch (error) {
      console.warn(error);
    }
  }
}
