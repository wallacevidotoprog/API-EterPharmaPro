import { IResponseBase } from "./../Interface/IResponseBase";
import { Router } from "express";
import { FirebaseService } from "../Class/FirebaseServiceClass";
import { IDelivery } from "../Interface/IDelivery";
import {MessageFirebaseNotify} from "../services/WebSocketServices"
import { TypesReciverWebSocketEnum } from "../Enum/TypesReciverWebSocketEnum";
import { table } from "console";

const routerDelivery = Router();

const firebaseService = new FirebaseService<IDelivery>("DELIVERY");

routerDelivery.post("/delivery", async (req, res) => {
  try {
    if (
      !req.body ||
      typeof req.body !== "object" ||
      Object.keys(req.body).length === 0
    ) {
      res.status(400).json({
        data: "Corpo da requisição inválido",
        actionResult: false,
      } as IResponseBase<string>);
    }
    const delivery = req.body as IDelivery;

    await firebaseService
      .INSERT(delivery)
      .then((dt) => {
        res.status(200).json({
          data: dt,
          actionResult: true,
        } as IResponseBase<typeof dt>);
      })
      .catch((err) => {
        res.status(401).json({
          data: err,
          actionResult: false,
        } as IResponseBase<typeof err>);
      });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      data: undefined,
      actionResult: false,
    } as IResponseBase<typeof undefined>);
  }
});

routerDelivery.put("/delivery/:id", async (req, res) => {  
  try {
    if (
      !req.body ||
      typeof req.body !== "object" ||
      Object.keys(req.body).length === 0
    ) {
      res.status(400).json({
        data: "Corpo da requisição inválido",
        actionResult: false,
      } as IResponseBase<string>);
    }

    const delivery = req.body as IDelivery;
    const id = req.params["id"];

    await firebaseService
      .UPDATE(id, delivery)
      .then((dt) => {
        MessageFirebaseNotify(TypesReciverWebSocketEnum.Delivery,'',id);
        res.status(200).json({
          data: dt,
          actionResult: true,
        } as IResponseBase<typeof dt>);
      })
      .catch((err) => {
        res.status(401).json({
          data: err,
          actionResult: false,
        } as IResponseBase<typeof err>);
      });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      data: undefined,
      actionResult: false,
    } as IResponseBase<typeof undefined>);
  }
});

routerDelivery.delete("/delivery/:id", async (req, res) => {
  try {
    if (!req.params["id"] || Object.keys(req.params["id"]).length === 0) {
      res.status(400).json({
        data: "O params da requisição inválido",
        actionResult: false,
      } as IResponseBase<string>);
    }
    const id = req.params["id"];

    await firebaseService
      .DELETE(id)
      .then((dt) => {
        res.status(200).json({
          data: dt,
          actionResult: true,
        } as IResponseBase<typeof dt>);
      })
      .catch((err) => {
        res.status(401).json({
          data: err,
          actionResult: false,
        } as IResponseBase<typeof err>);
      });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      data: undefined,
      actionResult: false,
    } as IResponseBase<typeof undefined>);
  }
});

routerDelivery.get("/delivery/:id", async (req, res) => {
  try {
    if (!req.params["id"] || Object.keys(req.params["id"]).length === 0) {
      res.status(400).json({
        data: "O params da requisição inválido",
        actionResult: false,
      } as IResponseBase<string>);
    }
    const id = req.params["id"];

    await firebaseService
      .GET(id)
      .then((dt) => {
        res.status(200).json({
          data: dt,
          actionResult: true,
        } as IResponseBase<typeof dt>);
      })
      .catch((err) => {
        res.status(401).json({
          data: err,
          actionResult: false,
        } as IResponseBase<typeof err>);
      });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      data: undefined,
      actionResult: false,
    } as IResponseBase<typeof undefined>);
  }
});
routerDelivery.get("/delivery", async (req, res) => {
  try {
    await firebaseService
      .GETALL()
      .then((dt) => {
        res.status(200).json({
          data: dt,
          actionResult: true,
        } as IResponseBase<typeof dt>);
      })
      .catch((err) => {
        res.status(401).json({
          data: err,
          actionResult: false,
        } as IResponseBase<typeof err>);
      });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      data: undefined,
      actionResult: false,
    } as IResponseBase<typeof undefined>);
  }
});

export default routerDelivery;
