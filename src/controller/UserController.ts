import { IUsers } from "./../Interface/db/IUsers";
import { IResponseBase } from "./../Interface/IResponseBase";
import { Router } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { AuthService } from "../services/AuthService";
import { OperationsDbClass } from "../Class/OperationsDbClass";
import { connection } from "../DatabaseMySql/DataBaseMySql";
import { ILoginUser } from "../Interface/ILoginUser";
import { IVerifyAuth } from "../Interface/IVerifyAuth";

const routerUser = Router();
const DbQuery = new OperationsDbClass<IUsers>("users");

routerUser.get("/verifyAuth", AuthMiddleware.Authenticate, (req, res) => {
  res.status(201).json({
    message: "Acesso permitido.",
    actionResult: true,
    data: {
      Authentication: true,
    },
  } as IResponseBase<IVerifyAuth>);
});

routerUser.post("/login", async (req, res) => {
  try {
    const objReq: ILoginUser = req.body;

    if (!objReq.email || !objReq.pass) {
      res.status(400).json({
        message: "Login ou Senha não preenchidos.",
        actionResult: false,
      } as IResponseBase<null>);
    }
    if (!connection) {
      res.status(500).json({
        message: "Erro interno: conexão com o banco de dados não estabelecida.",
        actionResult: false,
      } as IResponseBase<null>);
    }

    const [rows, _]: any = await connection?.query(
      DbQuery.GET({ email: objReq.email })
    );
    const verifyLogin: IUsers[] = rows;

    if (!Array.isArray(verifyLogin) || verifyLogin.length === 0) {
      res.status(401).json({
        message: "Credenciais inválidas.",
        actionResult: false,
      } as IResponseBase<null>);
    }

    if (Array.isArray(verifyLogin) && verifyLogin.length > 0) {
      const userTemp: IUsers = verifyLogin[0];

      const isPasswordValid = await AuthService.CryptPassCompare(
        objReq.pass,
        userTemp.pass
      );

      if (!isPasswordValid) {
        res.status(401).json({
          message: "Credenciais inválidas.",
          actionResult: false,
        } as IResponseBase<null>);
        return;
      }

      res.cookie("authToken", await AuthService.GenerateToken(userTemp), {
        httpOnly: true,
        secure: false,
        path: "/",
        maxAge: 3600000,
      });
      res.status(200).json({
        message: "Login bem-sucedido.",
        actionResult: true,
      } as IResponseBase<null>);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: error, actionResult: false } as IResponseBase<null>);
  }
});

routerUser.post("/signup", async (req, res) => {
  //verificar se ja existe email
  try {
    const objUser: IUsers = req.body;

    if (!objUser.email || !objUser.pass) {
      res.status(400).json({ message: "Email e senha são obrigatórios." }); //arrumar para o padrao
    }

    objUser.pass = await AuthService.CryptPass(objUser.pass);

    const [result]: any = await connection?.query(DbQuery.INSERT(objUser));

    if (result && result.insertId) {
      console.log("ID inserido:", result.insertId);
    } else {
      console.error("ID inserido não encontrado no resultado.");
    }

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      actionResult: true,
    } as IResponseBase<null>);
  } catch (error) {
    res
      .status(500)
      .json({ message: error, actionResult: false } as IResponseBase<null>);
  }
});

routerUser.post("/logout", AuthMiddleware.eLogout, async (req, res) => {
  res.status(200).json({
    message: "Logout realizado com sucesso.",
    actionResult: true,
  } as IResponseBase<null>);
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
