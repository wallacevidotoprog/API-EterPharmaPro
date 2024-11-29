import { Router } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { PossitionControllerClass } from "../Class/ControllersDb/PossitionControllerClass";

const routerPossition = Router();

const modelController = new PossitionControllerClass();

routerPossition.post("/possitin", AuthMiddleware.Authenticate, modelController.CREATE.bind(modelController));

routerPossition.put("/possitin/:id", AuthMiddleware.Authenticate ,  modelController.UPDATE.bind(modelController))

routerPossition.delete("/possitin/:id", AuthMiddleware.Authenticate ,  modelController.DELETE.bind(modelController));

routerPossition.get("/possitin/:id", AuthMiddleware.Authenticate ,  modelController.GET.bind(modelController));

routerPossition.get("/possitin", AuthMiddleware.Authenticate ,  modelController.GETALL.bind(modelController));

export default routerPossition;
