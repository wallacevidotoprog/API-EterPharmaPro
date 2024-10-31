import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const server = express();
const routers = require('./routers/index');
server.use(express.json());
server.use('/api',routers);
 
server.listen(process.env.PORT_SERVER, () => {
    console.log(`\x1b[33m[SERVER]\x1b[36m Server na porta ${process.env.PORT_SERVER}: http://localhost:${process.env.PORT_SERVER}/api \x1b[0m`); 
});
