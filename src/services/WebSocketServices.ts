// import { IMessageWebSocker } from "../Interface/IMessageWebSocker";
// import { Request } from "express";
// import { TypesReciverWebSocketEnum } from "../Enum/TypesReciverWebSocketEnum";
// import { Server } from "http";
// import { Server as WebSocketServer, WebSocket } from "ws";
// import { v4 as uuidv4 } from "uuid";
// import { IUserWS } from "../Interface/IUserWS";
// import { IResponseDelivery } from "../Interface/IResponseDelivery";

// let clients: IUserWS[] = [];

// export function MessageFirebaseNotify( type:TypesReciverWebSocketEnum, msg: string, data:IResponseDelivery) {
//   const message: IMessageWebSocker = {
//     type:type,
//     message: msg,
//     name: "SERVER",
//     data:data
//   };
//   clients.forEach((client) => {
//     if (client.WS.readyState === WebSocket.OPEN) {
//       client.WS.send(JSON.stringify(message));
//     }
//   });
// }

// export function InitializerWebSocker(server: Server) {
//   const wss = new WebSocketServer({ server, path: "/socket" });

//   // Enviar dados binários ao cliente imagens, áudio ou outros
//   //ws.send(dadosBinarios, { binary: true });

//   wss.on("connection", (ws: WebSocket, request: Request) => {
//     const uid = uuidv4();
//     console.log("Cliente conectado :" + uid);

//     const newCliente: IUserWS = { UID: uid, WS: ws };
//     clients.push(newCliente);

//     ws.on("message", (data: string) => {
//       const message: IMessageWebSocker = JSON.parse(data);
//       console.log(message);

//       switch (message.type) {
//         case TypesReciverWebSocketEnum.Register:
//           console.log(message.user);
//           clients.forEach((dt) => {
//             if (dt.UID === newCliente.UID) {
//               //dt.USER = { ...message.user };
//             }
//           });

//           const msgRegister: IMessageWebSocker = {
//             type: TypesReciverWebSocketEnum.Register,
//             uid: uid,
//           };
//           ws.send(JSON.stringify(msgRegister));
//           ws.send(ListClients());
//           //BroadcastUserOnline(newCliente.USER?.NOME ?? "Usuário anônimo", uid);
//           break;

//         case TypesReciverWebSocketEnum.Message:
//           MessageAll(message.message ?? "", newCliente);
//           break;

//         case TypesReciverWebSocketEnum.MessagePrivate:
//           if (message.id_msgprivete !== undefined) {
//             MessageBy(message.id_msgprivete, message.message ?? "", newCliente);
//           }
//           break;
//       }
//     });

//     ws.on("close", () => {
//       console.log("Cliente desconectado: " + uid);
//       //BroadcastUserOffline(newCliente.USER?.NOME ?? "Usuário anônimo", uid);
//       clients = clients.filter((c) => c.UID !== uid);
//       ws.send(ListClients());
//     });
//   });

//   function ListClients(): string {
//     const data: IMessageWebSocker = {
//       type: TypesReciverWebSocketEnum.Clients,
//       data: JSON.stringify(getClientsJson()),
//     };
//     return JSON.stringify(data);
//   }

//   function BroadcastUserOnline(name: string, uid: string) {
//     const message: IMessageWebSocker = {
//       type: TypesReciverWebSocketEnum.Online,
//       name: name,
//       uid: uid,
//     };
//     clients.forEach((client) => {
//       if (client.WS.readyState === WebSocket.OPEN) {
//         client.WS.send(JSON.stringify(message));
//         client.WS.send(ListClients());
//       }
//     });
//   }

//   function BroadcastUserOffline(name: string, uid: string) {
//     const message: IMessageWebSocker = {
//       type: TypesReciverWebSocketEnum.Offline,
//       name: name,
//       uid: uid,
//     };
//     clients.forEach((client) => {
//       if (client.WS.readyState === WebSocket.OPEN) {
//         client.WS.send(JSON.stringify(message));
//         client.WS.send(ListClients());
//       }
//     });
//   }

//   function MessageAll(msg: string, userSend: IUserWS) {
//     const message: IMessageWebSocker = {
//       type: TypesReciverWebSocketEnum.Message,
//       message: msg,
//       uid: userSend.UID,
//       //name: userSend.USER?.NOME ?? "",
//     };
//     clients.forEach((client) => {
//       if (client.WS.readyState === WebSocket.OPEN) {
//         client.WS.send(JSON.stringify(message));
//       }
//     });
//   }
//   function MessageBy(uid: string, msg: string, userSend: IUserWS) {
//     const message: IMessageWebSocker = {
//       type: TypesReciverWebSocketEnum.Message,
//       message: msg,
//       uid: userSend.UID,
//       //name: userSend.USER?.NOME ?? "",
//     };
//     clients.forEach((user) => {
//       if (user.WS.readyState === WebSocket.OPEN && user.UID === uid) {
//         user.WS.send(JSON.stringify(message));
//       }
//     });
//   }
//   function getClientsJson() {
//     return clients.map((client) => ({
//       UID: client.UID,
//       //NAME: client.USER?.NOME,
//     }));
//   }

    
// }


import { IMessageWebSocker } from "../Interface/IMessageWebSocker";
import { Request } from "express";
import { TypesReciverWebSocketEnum } from "../Enum/TypesReciverWebSocketEnum";
import { Server } from "http";
import { Server as WebSocketServer, WebSocket } from "ws";
import { v4 as uuidv4 } from "uuid";
import { IUserWS } from "../Interface/IUserWS";
import { IResponseDelivery } from "../Interface/IResponseDelivery";

export class WebSocketService {
  private clients: IUserWS[] = [];
  private wss: WebSocketServer | undefined;

  public initialize(server: Server): void {
    this.wss = new WebSocketServer({ server, path: "/socket" });
    this.wss.on("connection", (ws: WebSocket, request: Request) => {    
      this.handleConnection(ws);
    });
  }

  private handleConnection(ws: WebSocket): void {
    const uid = uuidv4();
    console.log("Cliente conectado: " + uid);

    const newClient: IUserWS = { UID: uid, WS: ws };
    this.clients.push(newClient);

    ws.on("message", (data: string) => this.handleMessage(data, newClient));    
    ws.on("close", () => this.handleDisconnect(newClient));
  }
  handleMsg(data: string, newClient: IUserWS): void {
    const message: IMessageWebSocker = JSON.parse(data);
    this.broadcastMessage(message.message || "", newClient);

  }

  private handleMessage(data: string, sender: IUserWS): void {
    const message: IMessageWebSocker = JSON.parse(data);
    console.log(message);
    console.log(message.type);
    console.log(message.message);

    switch (message.type) {
      case TypesReciverWebSocketEnum.Register:
        sender.UID = message.uid || sender.UID;
        sender.WS.send(JSON.stringify({ type: TypesReciverWebSocketEnum.Register, uid: sender.UID }));
        sender.WS.send(this.listClients());
        break;
      case TypesReciverWebSocketEnum.Message:
        this.broadcastMessage(message.message || "", sender);
        break;
      case TypesReciverWebSocketEnum.MessagePrivate:
        if (message.id_msgprivete) {
          this.sendMessageToUser(message.id_msgprivete, message.message || "", sender);
        }
        break;
    }
  }

  private handleDisconnect(client: IUserWS): void {
    console.log("Cliente desconectado: " + client.UID);
    this.clients = this.clients.filter((c) => c.UID !== client.UID);
  }

  public sendNotification(type: TypesReciverWebSocketEnum, msg: string, data: IResponseDelivery): void {
    const message: IMessageWebSocker = { type, message: msg, name: "SERVER", data };
    this.clients.forEach((client) => {
      if (client.WS.readyState === WebSocket.OPEN) {
        client.WS.send(JSON.stringify(message));
      }
    });
  }

  private broadcastMessage(msg: string, sender: IUserWS): void {
    const message: IMessageWebSocker = { type: TypesReciverWebSocketEnum.Message, message: msg, uid: sender.UID };
    this.clients.forEach((client) => {
      if (client.WS.readyState === WebSocket.OPEN) {
        client.WS.send(JSON.stringify(message));
      }
    });
  }

  private sendMessageToUser(uid: string, msg: string, sender: IUserWS): void {
    const message: IMessageWebSocker = { type: TypesReciverWebSocketEnum.Message, message: msg, uid: sender.UID };
    this.clients.forEach((user) => {
      if (user.WS.readyState === WebSocket.OPEN && user.UID === uid) {
        user.WS.send(JSON.stringify(message));
      }
    });
  }

  private listClients(): string {
    return JSON.stringify({ type: TypesReciverWebSocketEnum.Clients, data: this.clients.map(client => ({ UID: client.UID })) });
  }
}

