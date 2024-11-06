import { IMessageWebSocker } from "./../Interface/IMessageWebSocker";
import { IUsers } from "./../Interface/IUsers";
import { Request } from "express";
import { TypesReciverWebSocketEnum } from "./../Enum/TypesReciverWebSocketEnum";
import { Server } from "http";
import { Server as WebSocketServer, WebSocket } from "ws";
import { v4 as uuidv4 } from "uuid";
import { IUserWS } from "../Interface/IUserWS";

let clients: IUserWS[] = [];

export function InitializerWebSocker(server: Server) {
  const wss = new WebSocketServer({ server, path: "/socket" });

  // Enviar dados binários ao cliente imagens, áudio ou outros
  //ws.send(dadosBinarios, { binary: true });

  wss.on("connection", (ws: WebSocket, request: Request) => {
    const uid = uuidv4();
    console.log("Cliente conectado :" + uid);

    const newCliente: IUserWS = { UID: uid, WS: ws };
    clients.push(newCliente);

    ws.on("message", (data: string) => {
      const message: IMessageWebSocker = JSON.parse(data);
      console.log(message);
      
      switch (message.type) {
        case TypesReciverWebSocketEnum.Register:
          console.log(message.user);
          clients.forEach((dt) => {
            if (dt.UID === newCliente.UID) {
              dt.USER = { ...message.user };              
            }
          });
          
          const msgRegister: IMessageWebSocker = {
            type: TypesReciverWebSocketEnum.Register,
            uid: uid,
          };
          ws.send(JSON.stringify(msgRegister));
          ws.send(ListClients());
          BroadcastUserOnline(newCliente.USER?.NOME ?? "Usuário anônimo",uid);
          break;

        case TypesReciverWebSocketEnum.Message:
          MessageAll(message.message ?? "", newCliente);
          break;

        case TypesReciverWebSocketEnum.MessagePrivate:
          if (message.id_msgprivete !== undefined) {
            MessageBy(message.id_msgprivete, message.message ?? "", newCliente,);
          }
          break;
      }
    });

    ws.on("close", () => {
      console.log("Cliente desconectado: " + uid);
      BroadcastUserOffline(newCliente.USER?.NOME ?? "Usuário anônimo",uid);
      clients = clients.filter((c) => c.UID !== uid);
      ws.send(ListClients());
    });
  });

  function ListClients(): string {
    const data: IMessageWebSocker = {
      type: TypesReciverWebSocketEnum.Clients,
      data: JSON.stringify(getClientsJson()),
    };
    return JSON.stringify(data);
  }

  function BroadcastUserOnline(name: string, uid: string) {
    const message: IMessageWebSocker = {
      type: TypesReciverWebSocketEnum.Online,
      name: name,
      uid: uid,
    };
    clients.forEach((client) => {
      if (client.WS.readyState === WebSocket.OPEN) {
        client.WS.send(JSON.stringify(message));
        client.WS.send(ListClients());

      }
    });
  }

  function BroadcastUserOffline(name: string, uid: string) {
    const message: IMessageWebSocker = {
      type: TypesReciverWebSocketEnum.Offline,
      name: name,
      uid: uid,
    };
    clients.forEach((client) => {
      if (client.WS.readyState === WebSocket.OPEN) {
        client.WS.send(JSON.stringify(message));
        client.WS.send(ListClients());
      }
    });
  }

  function MessageAll(msg: string, userSend: IUserWS) {
    const message: IMessageWebSocker = {
      type: TypesReciverWebSocketEnum.Message,
      message: msg,
      uid: userSend.UID,
      name: userSend.USER?.NOME ?? "",
    };
    clients.forEach((client) => {
      if (client.WS.readyState === WebSocket.OPEN) {
        client.WS.send(JSON.stringify(message));
      }
    });
  }
  function MessageBy(uid: string, msg: string, userSend: IUserWS) {
    const message: IMessageWebSocker = {
      type: TypesReciverWebSocketEnum.Message,
      message: msg,
      uid: userSend.UID,
      name: userSend.USER?.NOME ?? "",
    };
    clients.forEach((user) => {
      if (user.WS.readyState === WebSocket.OPEN && user.UID === uid) {
        user.WS.send(JSON.stringify(message));
      }
    });
  }
  function getClientsJson() {
    return clients.map((client) => ({
      UID: client.UID,
      NAME: client.USER?.NOME,
    }));
  }
}
