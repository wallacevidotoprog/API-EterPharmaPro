import { Router } from 'express';
//import routerTeste from '../controller/teste';
import delivery from '../controller/DeliveryController';


const router = Router();

//router.use(routerTeste)
router.use(delivery)

module.exports = router;