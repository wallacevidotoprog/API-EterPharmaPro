import { Router } from "express";
//import routerTeste from '../controller/teste';
import delivery from "../controller/DeliveryController";
import users from "../controller/UserController";

const routerApp = Router();

//router.use(routerTeste)
routerApp.use(delivery);
routerApp.use(users);

module.exports = routerApp;
