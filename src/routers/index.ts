import { Router } from "express";
//import routerTeste from '../controller/teste';
import delivery from "../controller/DeliveryController";
import users from "../controller/UserController";

const router = Router();

//router.use(routerTeste)
router.use(delivery);
router.use(users);

module.exports = router;
