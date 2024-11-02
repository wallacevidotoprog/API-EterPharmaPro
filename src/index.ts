import express from "express";
import dotenv from "dotenv";
import { isConnected } from "./Firebase/FirebaseDb";
dotenv.config();
const server = express();
const routers = require("./routers/index");
server.use(express.json());
server.use("/api", routers);

server.get("/api/connected", (req, res) => {
  res.status(200).json({
    API: true,
    DB: isConnected,
  });
});

server.listen(process.env.PORT_SERVER || 3000, () => {
  console.log(
    `\x1b[33m[SERVER]\x1b[36m Server na porta ${process.env.PORT_SERVER}: http://localhost:${process.env.PORT_SERVER|| 3000}/api \x1b[0m`
  );
});
