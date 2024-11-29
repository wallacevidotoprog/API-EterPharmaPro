import { Router } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { AddressControllerClass } from "../Class/ControllersDb/AddressControllerClass";

const routerAddress = Router();

const modelController = new AddressControllerClass();

routerAddress.post("/address", AuthMiddleware.Authenticate, modelController.CREATE.bind(modelController));

routerAddress.put("/address/:id", AuthMiddleware.Authenticate ,  modelController.UPDATE.bind(modelController))

routerAddress.delete("/address/:id", AuthMiddleware.Authenticate ,  modelController.DELETE.bind(modelController));

routerAddress.get("/address/:id", AuthMiddleware.Authenticate ,  modelController.GET.bind(modelController));

routerAddress.get("/address", AuthMiddleware.Authenticate ,  modelController.GETALL.bind(modelController));

export default routerAddress;
