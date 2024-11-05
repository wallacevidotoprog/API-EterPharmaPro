import { IUsers } from "./../Interface/IUsers";
import { Request } from "express";
import { TypesReciverWebSocketEnum } from "./../Enum/TypesReciverWebSocketEnum";
import { Server } from "http";
import { Server as WebSocketServer, WebSocket } from "ws";
import { IMessageWebSocker } from "../Interface/IMessageWebSocker";
import { v4 as uuidv4 } from "uuid";
import { IUserWS } from "../Interface/IUserWS";

let clients: IUserWS[] = [];

export function InitializerWebSocker(server: Server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket, request: Request) => {
    const uid = uuidv4();
    console.log("Cliente conectado :" + uid);

    const newCliente: IUserWS = { UID: uid, WS: ws };
    clients.push(newCliente);

    ws.on("message", (data: string) => {
      const message: IMessageWebSocker = JSON.parse(data);

      switch (message.type) {
        case TypesReciverWebSocketEnum.Register:
          clients.forEach((dt) => {
            if (dt.UID === newCliente.UID) {
              dt.USER = { ...message.data };
            }
          });
          ws.send(
            JSON.stringify({
              type: TypesReciverWebSocketEnum.Register,
              UID: uid,
            })
          );
          ws.send(ListClients());
          break;

        case TypesReciverWebSocketEnum.Message:
          MessageAll(message.message ?? "", newCliente);
          break;

        case TypesReciverWebSocketEnum.MessagePrivate:
          if (message.id_msgprivete !== undefined) {
            MessageBy(message.id_msgprivete, message.message ?? "", newCliente);
          }
          break;
      }
    });

    ws.on("close", () => {
      console.log("Cliente desconectado: " + uid);
      clients = clients.filter((c) => c.UID !== uid);
      ws.send(ListClients());
    });
  });

  function ListClients(): string {
    const tempC = JSON.stringify(getClientsJson());
    console.log(tempC);

    return JSON.stringify({
      type: TypesReciverWebSocketEnum.Clients,
      clients: tempC, //verificar se esta certo
    });
  }

  function BroadcastUserOnline(name: string) {
    clients.forEach((client) => {
      if (client.WS.readyState === WebSocket.OPEN) {
        client.WS.send(
          JSON.stringify({
            type: TypesReciverWebSocketEnum.Online,
            messege: name,
          })
        );
      }
    });
  }

  function BroadcastUserOffline(name: string) {
    clients.forEach((client) => {
      if (client.WS.readyState === WebSocket.OPEN) {
        client.WS.send(
          JSON.stringify({
            type: TypesReciverWebSocketEnum.Offline,
            messege: name,
          })
        );
      }
    });
  }

  function MessageAll(msg: string, userSend: IUserWS) {
    clients.forEach((client) => {
      if (client.WS.readyState === WebSocket.OPEN) {
        client.WS.send(
          JSON.stringify({
            type: TypesReciverWebSocketEnum.Message,
            messege: msg,
            data: {
              UID: userSend.UID,
              NAME: userSend.USER?.NOME,
            },
          })
        );
      }
    });
  }
  function MessageBy(uid: string, msg: string, userSend: IUserWS) {
    clients.forEach((user) => {
      if (user.WS.readyState === WebSocket.OPEN && user.UID === uid) {
        user.WS.send(
          JSON.stringify({
            type: TypesReciverWebSocketEnum.Message,
            messege: msg,
            data: {
              UID: userSend.UID,
              NAME: userSend.USER?.NOME,
            },
          })
        );
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
