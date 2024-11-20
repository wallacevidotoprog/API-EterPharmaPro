import { IResponseBase } from "./../Interface/IResponseBase";
import { Router } from "express";
import { IUsers } from "../Interface/db/IUsers";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { AuthService } from "../services/AuthService";
import { OperationsDbClass } from "../Class/OperationsDbClass";
import { connection } from "../DatabaseMySql/DataBaseMySql";

const routerUser = Router();
const DbQuery = new OperationsDbClass<IUsers>("users");
routerUser.post("/login", async (req, res) => {});

routerUser.post("/signup", async (req, res) => {
  try {
    const objUser: IUsers = req.body;

    console.log(objUser);

    if (!objUser.email || !objUser.pass) {
      res.status(400).json({ message: "Email e senha são obrigatórios." }); //arrumar para o padrao
    }

    objUser.pass = await AuthService.CryptPass(objUser.pass);
    console.log("crypt pass:" + objUser.pass);

    await connection?.query(DbQuery.INSERT(objUser)).then((dt)=>{

      console.log(dt.insertId);
    })
    

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

routerUser.post("/logout", async (req, res) => {
  res.clearCookie("authToken");
  res.json({ message: "Logout realizado com sucesso." });
});

routerUser.get("/protected", AuthMiddleware.Authenticate, (req, res) => {
  res.json({ message: "Acesso permitido.", user: req.body.user });
});

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

    // await firebaseService
    //   .INSERT(delivery)
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

    // await firebaseService
    //   .UPDATE(id, delivery)
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

    // await firebaseService
    //   .DELETE(id)
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

    // await firebaseService
    //   .GET(id)
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
});
routerUser.get("/users", async (req, res) => {
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
});

export default routerUser;
