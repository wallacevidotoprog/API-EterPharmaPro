import { IEntrega } from "../Interface/IEntrega";
import { database } from "../Firebase/FirebaseDb";

export class FirebaseService {
 
  async insertEntrega(entrega: IEntrega): Promise<string> {
    const ref = database.ref("DELIVERY").push();
    await ref.set(entrega);
    return ref.key ?? "";
  }

  async updateEntrega(id: string, entrega: IEntrega): Promise<void> {
    await database.ref(`DELIVERY/${id}`).set(entrega);
  }

  async deleteEntrega(id: string): Promise<void> {
    await database.ref(`DELIVERY/${id}`).remove();
  }

  async getEntrega(id: string): Promise<IEntrega | null> {
    const snapshot = await database.ref(`DELIVERY/${id}`).once("value");
    return snapshot.exists() ? (snapshot.val() as IEntrega) : null;
  }

  async getAllEntregas(): Promise<{ [key: string]: IEntrega }> {
    const snapshot = await database.ref("DELIVERY").once("value");
    return snapshot.val() || {};
  }
}
