import { Router } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { StoreControllerClass } from "../Class/ControllersDb/StoreControllerClass";

const routerStore = Router();

const modelController = new StoreControllerClass();

routerStore.post("/store", AuthMiddleware.Authenticate, modelController.CREATE.bind(modelController));

routerStore.put("/store/:id", AuthMiddleware.Authenticate ,  modelController.UPDATE.bind(modelController))

routerStore.delete("/store/:id", AuthMiddleware.Authenticate ,  modelController.DELETE.bind(modelController));

routerStore.get("/store/:id", AuthMiddleware.Authenticate ,  modelController.GET.bind(modelController));

routerStore.get("/store", AuthMiddleware.Authenticate ,  modelController.GETALL.bind(modelController));

export default routerStore;
