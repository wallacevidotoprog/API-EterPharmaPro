import { IResponseBase } from "../Interface/IResponseBase";
import { Router } from "express";
import { MessageFirebaseNotify } from "../services/WebSocketServices";
import { TypesReciverWebSocketEnum } from "../Enum/TypesReciverWebSocketEnum";
import { ResponseDeliveryEnum } from "../Enum/ResponseDeliveryEnum";
import { DbModel } from "../models/DbModel";
import { OperationsDbClass } from "../Class/OperationsDbClass";
import { IOrderDelivery } from "../Interface/db/IOrderDelivery";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { HttpStatus } from "../Enum/HttpStatus";

const routerDeliveryImput = Router();

const dbQueryModel = new DbModel<IOrderDelivery>(
  new OperationsDbClass<IOrderDelivery>("order_delivery")
);

routerDeliveryImput.post(
  "/order_delivery",
  AuthMiddleware.Authenticate,
  async (req, res) => {
    try {
      if (
        !req.body ||
        typeof req.body !== "object" ||
        Object.keys(req.body).length === 0
      ) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "Corpo da requisição inválido",
          actionResult: false,
        } as IResponseBase<string>);
      }
      const orderDelivery: IOrderDelivery | any = [...req.body];

      await dbQueryModel
        .INSERT(orderDelivery)
        .then((data) => {
          MessageFirebaseNotify(TypesReciverWebSocketEnum.Delivery, "", {
            table: "DELIVERY_INPUT",
            type: ResponseDeliveryEnum.INSERT,
            data: orderDelivery,
          });
          res.status(HttpStatus.CREATED).json({
            actionResult: true,
          } as IResponseBase<typeof data>);
        })
        .catch((err) => {
          res.status(HttpStatus.BAD_REQUEST).json({
            data: err,
            actionResult: false,
          } as IResponseBase<typeof err>);
        });
    } catch (error) {
      console.log(error);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: error,
        actionResult: false,
      } as IResponseBase<typeof error>);
    }
  }
);

routerDeliveryImput.put(
  "/order_delivery/:id",
  AuthMiddleware.Authenticate,
  async (req, res) => {
    try {
      if (
        !req.body ||
        typeof req.body !== "object" ||
        Object.keys(req.body).length === 0
      ) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "Corpo da requisição inválido",
          actionResult: false,
        } as IResponseBase<string>);
      }

      const delivery: IOrderDelivery | any = [...req.body];
      const id: number = parseInt(req.params["id"]);

      await dbQueryModel
        .UPDATE(delivery, { id: id })
        .then((data) => {
          res.status(HttpStatus.OK).json({
            actionResult: true,
          } as IResponseBase<typeof data>);
        })
        .catch((err) => {
          res.status(HttpStatus.BAD_REQUEST).json({
            data: err,
            actionResult: false,
          } as IResponseBase<typeof err>);
        });
    } catch (error) {
      console.log(error);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: error,
        actionResult: false,
      } as IResponseBase<typeof error>);
    }
  }
);

routerDeliveryImput.delete("/order_delivery/:id",  AuthMiddleware.Authenticate,  async (req, res) => {
    try {
      if (!req.params["id"] || Object.keys(req.params["id"]).length === 0) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "O params da requisição inválido",
          actionResult: false,
        } as IResponseBase<string>);
      }
      const id: number = parseInt(req.params["id"]);

      await dbQueryModel
        .DELETE({ id: id })
        .then((data) => {
          res.status(HttpStatus.OK).json({
            actionResult: true,
          } as IResponseBase<typeof data>);
        })
        .catch((err) => {
          res.status(HttpStatus.BAD_REQUEST).json({
            data: err,
            actionResult: false,
          } as IResponseBase<typeof err>);
        });
    } catch (error) {
      console.log(error);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: error,
        actionResult: false,
      } as IResponseBase<typeof error>);
    }
  }
);

routerDeliveryImput.get("/order_delivery/:id",  AuthMiddleware.Authenticate,  async (req, res) => {
    try {
      if (!req.params["id"] || Object.keys(req.params["id"]).length === 0) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "O params da requisição inválido",
          actionResult: false,
        } as IResponseBase<string>);
      }
      
      const id: number = parseInt(req.params["id"]);

      await dbQueryModel
        .GET({id:id})
        .then((data) => {
          res.status(HttpStatus.OK).json({
            data: data,
            actionResult: true,
          } as IResponseBase<typeof data>);
        })
        .catch((err) => {
          res.status(HttpStatus.BAD_REQUEST).json({
            data: err,
            actionResult: false,
          } as IResponseBase<typeof err>);
        });
    } catch (error) {
      console.log(error);

      res.status(HttpStatus.BAD_REQUEST).json({
        data: error,
        actionResult: false,
      } as IResponseBase<typeof error>);
    }
  }
);
routerDeliveryImput.get("/order_delivery",  AuthMiddleware.Authenticate,  async (req, res) => {
    try {
      // await firebaseService
      //   .GETALL()
      //   .then((dt) => {
      //     res.status(200).json({
      //       data: dt,
      //       actionResult: true,
      //     } as IResponseBase<typeof dt>);
      //   })
      //   .catch((err) => {
      //     res.status(401).json({
      //       data: err,
      //       actionResult: false,
      //     } as IResponseBase<typeof err>);
      //   });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        data: undefined,
        actionResult: false,
      } as IResponseBase<typeof undefined>);
    }
  }
);

export default routerDeliveryImput;
