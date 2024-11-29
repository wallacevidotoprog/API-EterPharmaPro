import { Router } from "express";
import delivery from "../controller/DeliveryController";
import users from "../controller/UserController";
import possition from "../controller/PossitionController";
import store from "../controller/StoreController";
import motorcycle from "../controller/MotorcycleController";
import address from "../controller/AddressController";
import client from "../controller/ClientController";

const routerApp = Router();

routerApp.use(delivery);
routerApp.use(users);
routerApp.use(possition);
routerApp.use(store);
routerApp.use(motorcycle);
routerApp.use(address);
routerApp.use(client);

module.exports = routerApp;
