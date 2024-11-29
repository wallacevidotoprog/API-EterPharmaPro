import { Router } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { ClientAddressControllerClass, ClientControllerClass } from "../Class/ControllersDb/ClientControllerClass";

const routerClient = Router();

const modelControllerCliente = new ClientControllerClass();
const modelControllerAddress = new ClientAddressControllerClass();

routerClient.post("/client", AuthMiddleware.Authenticate, modelControllerCliente.CREATE.bind(modelControllerCliente));

routerClient.put("/client/:id", AuthMiddleware.Authenticate ,  modelControllerCliente.UPDATE.bind(modelControllerCliente))

routerClient.delete("/client/:id", AuthMiddleware.Authenticate ,  modelControllerCliente.DELETE.bind(modelControllerCliente));

routerClient.get("/client/:id", AuthMiddleware.Authenticate ,  modelControllerCliente.GET.bind(modelControllerCliente));

routerClient.get("/client", AuthMiddleware.Authenticate ,  modelControllerCliente.GETALL.bind(modelControllerCliente));

//----- address
routerClient.post("/client_address", AuthMiddleware.Authenticate, modelControllerAddress.CREATE.bind(modelControllerAddress));

routerClient.put("/client_address/:id", AuthMiddleware.Authenticate ,  modelControllerAddress.UPDATE.bind(modelControllerAddress))

routerClient.delete("/client_address/:id", AuthMiddleware.Authenticate ,  modelControllerAddress.DELETE.bind(modelControllerAddress));

routerClient.get("/client_address/:id", AuthMiddleware.Authenticate ,  modelControllerAddress.GET.bind(modelControllerAddress));

routerClient.get("/client_address", AuthMiddleware.Authenticate ,  modelControllerAddress.GETALL.bind(modelControllerAddress));

export default routerClient;
