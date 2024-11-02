import { IDelivery } from "../Interface/IDelivery";
import { database } from "../Firebase/FirebaseDb";

export class FirebaseService<T> {
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
    await database.ref(`${this.table}}/${id}`).set(input);
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
