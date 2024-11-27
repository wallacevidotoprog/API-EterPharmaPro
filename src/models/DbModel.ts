import { OperationsDbClass } from "../Class/OperationsDbClass";
import { connection } from "../DatabaseMySql/DataBaseMySql";

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
  public async DELETE(condition: Partial<T>) {
    try {
      await connection?.query(this.DbQuery.DELETE(condition));
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
      const [rows, _]: any = await connection?.query(this.DbQuery.GETALL());
      return rows;
    } catch (error) {
      console.warn(error);
    }
  }
}
