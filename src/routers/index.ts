import { Router } from "express";
import delivery from "../controller/DeliveryController";
import users from "../controller/UserController";
import orderDeliveryController from "../controller/OrderDeliveryController";

const routerApp = Router();

//router.use(routerTeste)
routerApp.use(delivery);
routerApp.use(orderDeliveryController);
routerApp.use(users);

module.exports = routerApp;
