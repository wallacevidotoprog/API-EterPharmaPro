import { IResponseBase } from "../Interface/IResponseBase";
import { Router } from "express";
import { FirebaseService } from "../Class/FirebaseServiceClass";
import { IDeliveryInput } from "../Interface/IDeliveryInput";
import { MessageFirebaseNotify } from "../services/WebSocketServices";
import { TypesReciverWebSocketEnum } from "../Enum/TypesReciverWebSocketEnum";
import { ResponseDeliveryEnum } from "../Enum/ResponseDeliveryEnum";

const routerDeliveryImput = Router();

const firebaseService = new FirebaseService<IDeliveryInput>("DELIVERY_INPUT");

routerDeliveryImput.post("/delivery_input", async (req, res) => {
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
    const delivery = req.body as IDeliveryInput;

    await firebaseService
      .INSERT(delivery)
      .then((dt) => {
        MessageFirebaseNotify(TypesReciverWebSocketEnum.Delivery,'',{
          table:"DELIVERY_INPUT",
          type:ResponseDeliveryEnum.INSERT, 
          IDF:dt,         
          data:delivery
        });
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

routerDeliveryImput.put("/delivery_input/:id", async (req, res) => {
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

    const delivery = req.body as IDeliveryInput;
    const id = req.params["id"];

    await firebaseService
      .UPDATE(id, delivery)
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

routerDeliveryImput.delete("/delivery_input/:id", async (req, res) => {
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

routerDeliveryImput.get("/delivery_input/:id", async (req, res) => {
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
routerDeliveryImput.get("/delivery_input", async (req, res) => {
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

export default routerDeliveryImput;
