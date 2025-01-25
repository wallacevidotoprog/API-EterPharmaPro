import { Router } from 'express';
import { UsersControllerClass } from '../Class/ControllersDb/UsersControllerClass';
import { HttpStatus } from '../Enum/HttpStatus';
import { IVerifyAuth } from '../Interface/IVerifyAuth';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { IResponseBase } from './../Interface/IResponseBase';

const routerUser = Router();
const modelController = new UsersControllerClass();

routerUser.get('/verifyAuth', AuthMiddleware.Authenticate, (req, res) => {
  res.status(HttpStatus.OK).json({
    message: 'Acesso permitido.',
    actionResult: true,
    data: {
      Authentication: true,
    },
  } as IResponseBase<IVerifyAuth>);
});

routerUser.post('/login', modelController.VerifyUserExist.bind(modelController));

routerUser.post('/logout', AuthMiddleware.eLogout, async (req, res) => {
  res.status(HttpStatus.OK).json({
    message: 'Logout realizado com sucesso.',
    actionResult: true,
  } as IResponseBase<null>);
});
routerUser.post('/signup', modelController.CREATE.bind(modelController));

routerUser.post('/users', AuthMiddleware.Authenticate, modelController.CREATE.bind(modelController));

routerUser.put('/users/:id', AuthMiddleware.Authenticate, modelController.UPDATE.bind(modelController));

routerUser.delete('/users/:id', AuthMiddleware.Authenticate, modelController.DELETE.bind(modelController));

routerUser.get('/users', AuthMiddleware.Authenticate, modelController.GETALLFULL.bind(modelController));

export default routerUser;
