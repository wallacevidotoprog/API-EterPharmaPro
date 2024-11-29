import { Router } from "express";
import { DeliveryControllerClass, DeliveryStatusControllerClass, OrderDeliveryControllerClass, StatusDeliveryControllerClass, TypeOrderDeliveryControllerClass } from "../Class/ControllersDb/DeliveryControllerClass";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const routerDelivery = Router();

const modelControllerOrder = new OrderDeliveryControllerClass();
const modelController = new DeliveryControllerClass();
const modelControllerDeStatus = new DeliveryStatusControllerClass;
const modelControllerStatus = new StatusDeliveryControllerClass();
const modelControllerType = new TypeOrderDeliveryControllerClass();


routerDelivery.post("/order_delivery",AuthMiddleware.Authenticate, modelControllerOrder.CREATE.bind(modelControllerOrder));

routerDelivery.put("/order_delivery/:id",  AuthMiddleware.Authenticate, modelControllerOrder.UPDATE.bind(modelControllerOrder));

routerDelivery.delete("/order_delivery/:id",  AuthMiddleware.Authenticate,modelControllerOrder.DELETE.bind(modelControllerOrder));

routerDelivery.get("/order_delivery/:id",AuthMiddleware.Authenticate,  modelControllerOrder.GET.bind(modelControllerOrder)); 

routerDelivery.get("/order_delivery",  AuthMiddleware.Authenticate, modelControllerOrder.GETALL.bind(modelControllerOrder));


//--- Delivery
routerDelivery.post("/delivery", AuthMiddleware.Authenticate, modelController.CREATE.bind(modelController));

routerDelivery.put("/delivery/:id", AuthMiddleware.Authenticate ,  modelController.UPDATE.bind(modelController))

routerDelivery.delete("/delivery/:id", AuthMiddleware.Authenticate ,  modelController.DELETE.bind(modelController));

routerDelivery.get("/delivery/:id", AuthMiddleware.Authenticate ,  modelController.GET.bind(modelController));

routerDelivery.get("/delivery", AuthMiddleware.Authenticate ,  modelController.GETALL.bind(modelController));

//---- DeliveryStatus
routerDelivery.post("/delivery_status", AuthMiddleware.Authenticate, modelControllerDeStatus.CREATE.bind(modelControllerDeStatus));

routerDelivery.put("/delivery_status/:id", AuthMiddleware.Authenticate ,  modelControllerDeStatus.UPDATE.bind(modelControllerDeStatus))

routerDelivery.delete("/delivery_status/:id", AuthMiddleware.Authenticate ,  modelControllerDeStatus.DELETE.bind(modelControllerDeStatus));

routerDelivery.get("/delivery_status/:id", AuthMiddleware.Authenticate ,  modelControllerDeStatus.GET.bind(modelControllerDeStatus));

routerDelivery.get("/delivery_status", AuthMiddleware.Authenticate ,  modelControllerDeStatus.GETALL.bind(modelControllerDeStatus));

//---- Status
routerDelivery.post("/status", AuthMiddleware.Authenticate, modelControllerStatus.CREATE.bind(modelControllerStatus));

routerDelivery.put("/status/:id", AuthMiddleware.Authenticate ,  modelControllerStatus.UPDATE.bind(modelControllerStatus))

routerDelivery.delete("/status/:id", AuthMiddleware.Authenticate ,  modelControllerStatus.DELETE.bind(modelControllerStatus));

routerDelivery.get("/status/:id", AuthMiddleware.Authenticate ,  modelControllerStatus.GET.bind(modelControllerStatus));

routerDelivery.get("/status", AuthMiddleware.Authenticate ,  modelControllerStatus.GETALL.bind(modelControllerStatus));


//---- Type
routerDelivery.post("/type_order", AuthMiddleware.Authenticate, modelControllerType.CREATE.bind(modelControllerType));

routerDelivery.put("/type_order/:id", AuthMiddleware.Authenticate ,  modelControllerType.UPDATE.bind(modelControllerType))

routerDelivery.delete("/type_order/:id", AuthMiddleware.Authenticate ,  modelControllerType.DELETE.bind(modelControllerType));

routerDelivery.get("/type_order/:id", AuthMiddleware.Authenticate ,  modelControllerType.GET.bind(modelControllerType));

routerDelivery.get("/type_order", AuthMiddleware.Authenticate ,  modelControllerType.GETALL.bind(modelControllerType));




export default routerDelivery;
