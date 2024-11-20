import { Router } from "express";
import delivery from "../controller/DeliveryController";
import users from "../controller/UserController";
import DeliveryImput from "../controller/DeliveryInputController";

const routerApp = Router();

//router.use(routerTeste)
routerApp.use(delivery);
routerApp.use(DeliveryImput);
routerApp.use(users);

module.exports = routerApp;
