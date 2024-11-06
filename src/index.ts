import { AppServer } from "./Class/AppClass";



const app = new AppServer();
app.StartServer();

// import express from "express";
// import dotenv from "dotenv";//
// import { createServer } from "http";//
// import { isConnected } from "./Firebase/FirebaseDb";
// import { InitializerWebSocker } from "./controller/WebSocketController";

// dotenv.config();//
// const app = express();//


// app.use(express.json());//
// const routers = require("./routers/index");//
// app.use("/api", routers);//
// app.use(express.static(__dirname + "/../public"));//

// const server = createServer(app);//

// InitializerWebSocker(server);//

// server.listen(process.env.PORT_SERVER || 3000, () => {
//   console.log(
//     `\x1b[33m[SERVER]\x1b[36m Server na porta ${
//       process.env.PORT_SERVER
//     }: http://localhost:${process.env.PORT_SERVER || 3000}/api \x1b[0m`
//   );
// });

// app.get("/api/connected", (req, res) => {
//   res.status(200).json({
//     API: true,
//     DB: isConnected,
//   });
// });
