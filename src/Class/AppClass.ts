import express, { Application } from "express";
import { InitializerWebSocker } from "../services/WebSocketServices";
import { createServer, Server } from "http";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { isConnected } from "../DatabaseMySql/DataBaseMySql";
import cors from "cors";
dotenv.config();

export class AppServer {
  private app: Application;
  private server: Server | undefined;

  constructor() {
    this.app = express();
    this.config();
    this.RouterDefault();
    this.websocket();
  }
  private config(): void {
    this.app.use(
      cors({
        origin: process.env.ORIGIN||'*',
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
    this.app.use(express.static(path.join(process.cwd(), "/public")));
    this.app.use("/api", require("../routers/index"));
  }

  private websocket(): void {
    this.server = createServer(this.app);
    InitializerWebSocker(this.server);
  }
  private RouterDefault(): void {
    this.app.get("/api/connected", (req, res) => {
      res.status(200).json({
        API: true,
        DB: isConnected,
      });
    });
    this.app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "/public", "index.html"));
    });
  }

  public StartServer(): void {
    this.server?.listen(process.env.PORT_SERVER || 3000, () => {
      console.log(
        `\x1b[33m[SERVER]✅\x1b[36m Server na porta ${
          process.env.PORT_SERVER
        }: ${process.env.SERVER}:${process.env.PORT_SERVER || 3000}/api \x1b[0m`
      );
    });
  }
}
