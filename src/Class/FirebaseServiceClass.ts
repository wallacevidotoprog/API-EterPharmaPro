import { database } from "../Firebase/FirebaseDb";

export class FirebaseService<T extends object> {
  private table: string;

  constructor(table: string) {
    this.table = table;
  }

  async INSERT(entrega: T): Promise<string> {
    const ref = database.ref(this.table).push();
    await ref.set(entrega);
    return ref.key ?? "";
  }

  async UPDATE(id: string, input: T): Promise<void> {
    const snapshot = await database.ref(`${this.table}/${id}`).once("value");
    const existingData = snapshot.val as T;

    const updates: Partial<T> = {};

    (Object.keys(input) as (keyof T)[]).forEach((key) => {
      if (input[key] !== existingData[key]) {
        updates[key] = input[key];
      }
    });

    if (Object.keys(updates).length > 0) {
      await database.ref(`${this.table}/${id}`).update(updates);
    }
    //   await database.ref(`${this.table}}/${id}`).set(input);
  }

  async DELETE(id: string): Promise<void> {
    await database.ref(`${this.table}/${id}`).remove();
  }

  async GET(id: string): Promise<T | null> {
    const snapshot = await database.ref(`${this.table}/${id}`).once("value");
    return snapshot.exists() ? (snapshot.val() as T) : null;
  }

  async GETALL(): Promise<{ [key: string]: T }> {
    const snapshot = await database.ref(this.table).once("value");
    return snapshot.val() || {};
  }
}
