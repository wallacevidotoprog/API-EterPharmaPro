import { Router } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { MotorcycleControllerClass, MotorcycleMaintenanceControllerClass, MotorcycleTypeMintenanceControllerClass } from "../Class/ControllersDb/MotorcycleControllerClass";

const routerMotorcycle = Router();

const modelController = new MotorcycleControllerClass();
const modelControllerMaintenance = new MotorcycleMaintenanceControllerClass();
const modelControllerType = new MotorcycleTypeMintenanceControllerClass();


routerMotorcycle.post("/motorcycle", AuthMiddleware.Authenticate, modelController.CREATE.bind(modelController));

routerMotorcycle.put("/motorcycle/:id", AuthMiddleware.Authenticate ,  modelController.UPDATE.bind(modelController))

routerMotorcycle.delete("/motorcycle/:id", AuthMiddleware.Authenticate ,  modelController.DELETE.bind(modelController));

routerMotorcycle.get("/motorcycle/:id", AuthMiddleware.Authenticate ,  modelController.GET.bind(modelController));

routerMotorcycle.get("/motorcycle", AuthMiddleware.Authenticate ,  modelController.GETALL.bind(modelController));

//------maintenance
routerMotorcycle.post("/maintenance_motor", AuthMiddleware.Authenticate, modelControllerMaintenance.CREATE.bind(modelControllerMaintenance));

routerMotorcycle.put("/maintenance_motor/:id", AuthMiddleware.Authenticate ,  modelControllerMaintenance.UPDATE.bind(modelControllerMaintenance))

routerMotorcycle.delete("/maintenance_motor/:id", AuthMiddleware.Authenticate ,  modelControllerMaintenance.DELETE.bind(modelControllerMaintenance));

routerMotorcycle.get("/maintenance_motor/:id", AuthMiddleware.Authenticate ,  modelControllerMaintenance.GET.bind(modelControllerMaintenance));

routerMotorcycle.get("/maintenance_motor", AuthMiddleware.Authenticate ,  modelControllerMaintenance.GETALL.bind(modelControllerMaintenance));

//-----Type
routerMotorcycle.post("/type_maintenance", AuthMiddleware.Authenticate, modelControllerType.CREATE.bind(modelControllerType));

routerMotorcycle.put("/type_maintenance/:id", AuthMiddleware.Authenticate ,  modelControllerType.UPDATE.bind(modelControllerType))

routerMotorcycle.delete("/type_maintenance/:id", AuthMiddleware.Authenticate ,  modelControllerType.DELETE.bind(modelControllerType));

routerMotorcycle.get("/type_maintenance/:id", AuthMiddleware.Authenticate ,  modelControllerType.GET.bind(modelControllerType));

routerMotorcycle.get("/type_maintenance", AuthMiddleware.Authenticate ,  modelControllerType.GETALL.bind(modelControllerType));





export default routerMotorcycle;
