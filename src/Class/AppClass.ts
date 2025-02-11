import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import fs from 'fs';
import { createServer as createHTTPServer, Server } from 'http';
import { createServer as createHTTPSServer } from 'https';
import os from 'os';
import path from 'path';
import { isConnected } from '../DatabaseMySql/DataBaseMySql';
import { websocketService } from '../services/WebSocketInstance';
dotenv.config();
//const fs = require('fs');

export class AppServer {
  private app: Application;
  private server: Server | undefined;

  constructor() {
    this.app = express();
    this.config();
    this.RouterDefault();
    this.StartHTTPSorHTTP();
    //this.websocket();
  }
  private config(): void {
    this.app.use(
      cors({
        origin: process.env.ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
    this.app.use(express.static(path.join(process.cwd(), '/public')));
    this.app.use('/api', require('../routers/index'));
  }

  private StartHTTPSorHTTP(): void {
    const env = process.env.NODE_ENV || 'development';

    if (env === 'production') {
      try {
        const options = {
          key: fs.readFileSync('/etc/letsencrypt/live/etersystem.ddns.net/privkey.pem'),
          cert: fs.readFileSync('/etc/letsencrypt/live/etersystem.ddns.net/fullchain.pem'),
        };
        this.server = createHTTPSServer(options, this.app);
        console.log('\x1b[33m[HTTPS]\x1b[36m ✅ HTTPS server is running in production mode\x1b[0m');
      } catch (error) {
        console.error('\x1b[31m[HTTPS]\x1b[36m ❌ Error loading SSL certificates:\x1b[0m', error);
        console.log('\x1b[33m[FALLBACK]\x1b[36m ⚠️  Starting HTTP server instead\x1b[0m');
        this.server = createHTTPServer(this.app);
      }
    } else {
      this.server = createHTTPServer(this.app);
      console.log('\x1b[34m[HTTP]🚀 HTTP server is running in development mode\x1b[0m');
    }
  }

  // private StartHTTPSorHTTP():void{
  //   // const options = {
  //   //   key: fs.readFileSync('/etc/letsencrypt/live/etersystem.ddns.net/privkey.pem'),
  //   //   cert: fs.readFileSync('/etc/letsencrypt/live/etersystem.ddns.net/fullchain.pem'),
  //   // };
  //   // this.server = createServer(options,this.app);
  //   this.server = createServer(this.app);
  // }
  private websocket(): void {
    if (!this.server) return;
    websocketService.initialize(this.server);
  }
  private RouterDefault(): void {
    this.app.get('/api/connected', (req, res) => {
      res.status(200).json({
        API: true,
        DB: isConnected,
      });
    });
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(process.cwd(), '/public', 'index.html'));
    });
  }

  public StartServer(): void {
    const host = process.env.SERVER || '0.0.0.0';
    const port = process.env.PORT_SERVER || 3000;

    // @ts-ignore
    this.server?.listen(port, host, () => {
      console.log(`\x1b[33m[SERVER]✅\x1b[36m Server running on http://${this.getLocalIP()}:${port}`);
    });
  }

  private getLocalIP(): string {
    const interfaces = os.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
      if (iface) {
        for (const details of iface) {
          if (details.family === 'IPv4' && !details.internal) {
            return details.address;
          }
        }
      }
    }
    return 'localhost';
  }
}
