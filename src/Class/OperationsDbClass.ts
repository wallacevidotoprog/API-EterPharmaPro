export class OperationsDbClass<T extends object> {
  private readonly table: string;

  constructor(table: string) {
    this.table = table;
  }

  INSERT(model: T): string {
    const keys = Object.keys(model);
    const values = Object.values(model).map((value) =>
      typeof value === "string" ? `'${value}'` : value
    );
    return `INSERT INTO ${this.table} (${keys.join(
      ", "
    )}) VALUES (${values.join(", ")})`;
  }

  public UPDATE(model: Partial<T>, condition: Partial<T>): string {

    if (!model || Object.keys(model).length === 0) {
      throw new Error("O objeto 'model' não pode estar vazio.");
    }
  
    if (!condition || Object.keys(condition).length === 0) {
      throw new Error("O objeto 'condition' não pode estar vazio.");
    }
    
    const updates = Object.entries(model)
      .map(
        ([key, value]) =>
          `${key} = ${typeof value === "string" ? `'${value}'` : value}`
      )
      .join(", ");

    const whereClause = Object.entries(condition)
      .map(
        ([key, value]) =>
          `${key} = ${typeof value === "string" ? `'${value}'` : value}`
      )
      .join(" AND ");

    return `UPDATE ${this.table} SET ${updates} WHERE ${whereClause}`;
  }
  public DELETE(condition: Partial<T>): string {
    const whereClause = Object.entries(condition)
      .map(
        ([key, value]) =>
          `${key} = ${typeof value === "string" ? `'${value}'` : value}`
      )
      .join(" AND ");

    return `DELETE FROM ${this.table} WHERE ${whereClause}`;
  }
  public GET(condition: Partial<T>): string {
    const whereClause = Object.entries(condition)
      .map(
        ([key, value]) =>
          `${key} = ${typeof value === "string" ? `'${value}'` : value}`
      )
      .join(" AND ");

    return `SELECT * FROM ${this.table} WHERE ${whereClause}`;
  }

  public GETALL(): string {
    return `SELECT * FROM ${this.table}`;
  }
}
