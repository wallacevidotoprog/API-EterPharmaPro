import express from "express";
import dotenv from "dotenv";
//import socket from 'socket.io';
import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
import http from "http";

dotenv.config();
const app = express();
app.use(express.json());
const routers = require("./routers/index");
app.use("/api", routers);
app.use(express.static(__dirname + "/../public"));
//const httpServer = http.createServer(server);
//const { Server } = require('socket.io');
//const io = new Server(httpServer, {
//  path: '/socket.io'
//})

const server = app.listen(process.env.PORT_SERVER || 3000, () => {
  console.log(
    `\x1b[33m[SERVER]\x1b[36m Server na porta ${
      process.env.PORT_SERVER
    }: http://localhost:${process.env.PORT_SERVER || 3000}/api \x1b[0m`
  );
});

app.get("/api/connected", (req, res) => {
  res.status(200).json({
    API: true,
    DB: false,
  });
});

interface Client {
  id: string;
  name?: string;
  sockets: WebSocket | any;
}

const clients: Client[] = [];

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  const clientId = uuidv4(); // Gera um ID único para o cliente
  const newClient: Client = { id: clientId, sockets: ws };
  clients.push(newClient); // Adiciona o cliente à lista
  console.log(`Client connected: ${clientId}`);
  ws.send(JSON.stringify({ message: "Você está conectado!", clientId }));

  //broadcastClientList();

  ws.on("message", (message) => {
    console.log(`Received from ${clientId}: ${message}`);
    let decodedMessage: string;

    if (Buffer.isBuffer(message)) {
      decodedMessage = message.toString("utf8");
    } else {
      decodedMessage = String(message);
    }

    let messageValue: string | undefined;

    try {
      // Tenta fazer o parsing do JSON
      const parsedMessage = JSON.parse(decodedMessage);

      if ("type" in parsedMessage) {
        if ("type" in parsedMessage && parsedMessage.type === "register") {
          const client = clients.find((c) => c.id === clientId);
          if (client) {
            // Atualiza o nome do cliente
            client.name = parsedMessage.name;
            clients.forEach((client) => {
              client.sockets.send(JSON.stringify({ clients }));
            });
            return;
          }
        }
      }

      // Extrai o valor da chave "message", se existir
      messageValue = parsedMessage.message;
    } catch (error) {
      console.error("Mensagem não é um JSON válido:", error);
      console.log("decodedMessage:", decodedMessage);
    }

    clients.forEach((client) => {
      client.sockets.send(
        JSON.stringify({ senderId: clientId, message: decodedMessage })
      );
    });

    // Envie uma mensagem ao cliente a cada 5 segundos
    // const sendMessage = setInterval(() => {
    //   ws.send(JSON.stringify({ message: "Hello from server!" }));
    // }, 50000);

    ws.on("close", () => {
      console.log(`Client disconnected: ${clientId}`);
      const index = clients.findIndex((client) => client.id === clientId);
      if (index !== -1) {
        clients.splice(index, 1);
      }
      clients.forEach((client) => {
        client.sockets.send(JSON.stringify({ clients }));
      });
    });
  });

  // function broadcastClientList() {
  //   const clientIds = clients.map(client => client.id);
  //   const message = JSON.stringify({ type: 'clientList', clients: clientIds });
  //   clients.forEach(client => {
  //       client.sockets.send(message);
  //   });
});
