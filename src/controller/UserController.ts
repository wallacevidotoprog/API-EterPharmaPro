import { IUsers } from './../Interface/IUsers';
import { IResponseBase } from "./../Interface/IResponseBase";
import { Router } from "express";
import { FirebaseService } from "../Class/FirebaseServiceClass";

const routerUser = Router();

const firebaseService = new FirebaseService<IUsers>("USERS");


routerUser.post("/users", async (req, res) => {
  try {
    console.log(req.body);
    
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
    const delivery = req.body as IUsers;

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

routerUser.put("/users/:id", async (req, res) => {
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

    const delivery = req.body as IUsers;
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

routerUser.delete("/users/:id", async (req, res) => {
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

routerUser.get("/users/:id", async (req, res) => {
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
routerUser.get("/users", async (req, res) => {
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

export default routerUser;
