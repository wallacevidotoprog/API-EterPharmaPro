import { Router } from "express";
import { DeliveryControllerClass } from "../Class/ControllersDb/DeliveryController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const routerDelivery = Router();

const modelController = new DeliveryControllerClass();

routerDelivery.post("/delivery", AuthMiddleware.Authenticate, modelController.CREATE.bind(modelController));

routerDelivery.put("/delivery/:id", AuthMiddleware.Authenticate ,  modelController.UPDATE.bind(modelController))

routerDelivery.delete("/delivery/:id", AuthMiddleware.Authenticate ,  modelController.DELETE.bind(modelController));

routerDelivery.get("/delivery/:id", AuthMiddleware.Authenticate ,  modelController.GET.bind(modelController));

routerDelivery.get("/delivery", AuthMiddleware.Authenticate ,  modelController.GETALL.bind(modelController));

export default routerDelivery;
