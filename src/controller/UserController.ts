import { IUsers } from "./../Interface/db/IUsers";
import { IResponseBase } from "./../Interface/IResponseBase";
import { Router } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { AuthService } from "../services/AuthService";
import { OperationsDbClass } from "../Class/OperationsDbClass";
import { ILoginUser } from "../Interface/ILoginUser";
import { IVerifyAuth } from "../Interface/IVerifyAuth";
import { DbModel } from "../models/DbModel";
import { HttpStatus } from "../Enum/HttpStatus";

const routerUser = Router();
const dbQ = new DbModel<IUsers>(new OperationsDbClass<IUsers>("users"));

routerUser.get("/verifyAuth", AuthMiddleware.Authenticate, (req, res) => {
  res.status(HttpStatus.OK).json({
    message: "Acesso permitido.",
    actionResult: true,
    data: {
      Authentication: true,
    },
  } as IResponseBase<IVerifyAuth>);
});

routerUser.get("/teste", AuthMiddleware.Authenticate, async (req, res) => {
  const [retult, _]: IUsers[] | any = await dbQ.GETALL();

  console.log(retult);

  res.status(200).json({
    message: "tudo OK.",
    actionResult: true,
    data: retult,
  } as IResponseBase<IUsers[]>);
});
routerUser.post("/login", async (req, res) => {
  try {
    if (!req.body?.email || !req.body?.pass) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: "Login ou Senha não preenchidos.",
        actionResult: false,
      } as IResponseBase<null>);
      return;
    }

    const objReq: ILoginUser = req.body;
    const [rows, _]: any = await dbQ.GET({ email: objReq.email });

    if (!rows && rows.length < 0) {
      res.status(401).json({
        message: "Credenciais inválidas.",
        actionResult: false,
      } as IResponseBase<null>);
      return;
    }

    const userTemp: IUsers = Array.isArray(rows) ? rows[0] : rows;

    const isPasswordValid = await AuthService.CryptPassCompare(
      objReq.pass,
      userTemp.pass
    );

    if (!isPasswordValid) {
      res.status(HttpStatus.UNAUTHORIZED).json({
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
    res.status(HttpStatus.OK).json({
      message: "Login bem-sucedido.",
      actionResult: true,
    } as IResponseBase<null>);
  } catch (error) {
    res
      .status(500)
      .json({ message: error, actionResult: false } as IResponseBase<null>);
  }
});

routerUser.post("/signup", async (req, res) => {
  try {
    const objUser: IUsers = req.body;

    if (!objUser.email || !objUser.pass) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: "Email e senha são obrigatórios.",
        actionResult: false,
      } as IResponseBase<null>);
    }

    objUser.pass = await AuthService.CryptPass(objUser.pass);

    const [result]: any = await dbQ.INSERT(objUser);

    if (result && result.insertId) {
      console.log("ID inserido:", result.insertId);
    } else {
      console.error("ID inserido não encontrado no resultado.");
    }

    res.status(HttpStatus.CREATED).json({
      message: "Usuário registrado com sucesso!",
      actionResult: true,
    } as IResponseBase<null>);
  } catch (error) {
    console.warn(error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error, actionResult: false } as IResponseBase<null>);
  }
});

routerUser.post("/logout", AuthMiddleware.eLogout, async (req, res) => {
  res.status(HttpStatus.OK).json({
    message: "Logout realizado com sucesso.",
    actionResult: true,
  } as IResponseBase<null>);
});

routerUser.get("/protected", AuthMiddleware.Authenticate, (req, res) => {
  res.json({ message: "Acesso permitido.", user: req.body.user });
});

routerUser.post("/users", AuthMiddleware.Authenticate, async (req, res) => {
  try {
    if (
      !req.body ||
      typeof req.body !== "object" ||
      Object.keys(req.body).length === 0
    ) {
      res.status(HttpStatus.BAD_REQUEST).json({
        data: "Corpo da requisição inválido",
        actionResult: false,
      } as IResponseBase<string>);
      return;
    }
    const objUser: IUsers = req.body;

    dbQ.INSERT(objUser).then((ret) => {
      res.status(HttpStatus.CREATED).json({
        message: "Usuário inserido com sucesso.",
        actionResult: true,
      } as IResponseBase<typeof undefined>);
    });
  } catch (error) {
    console.log(error);

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      data: undefined,
      actionResult: false,
    } as IResponseBase<typeof undefined>);
  }
});

routerUser.put("/users/:id", AuthMiddleware.Authenticate, async (req, res) => {
  try {
    if (
      !req.body ||
      typeof req.body !== "object" ||
      Object.keys(req.body).length === 0
    ) {
      res.status(HttpStatus.BAD_REQUEST).json({
        data: "Corpo da requisição inválido",
        actionResult: false,
      } as IResponseBase<string>);
      return;
    }

    const users = req.body as IUsers;

    if (users.pass) {
      console.log(users.pass);

      users.pass = await AuthService.CryptPass(users.pass);
    }

    const id: number = parseInt(req.params["id"]);

    dbQ.UPDATE(users, { id: id }).then((ret) => {
      res.status(HttpStatus.OK).json({
        message: "Usuário atualizado com sucesso.",
        actionResult: true,
      } as IResponseBase<typeof undefined>);
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      data: undefined,
      actionResult: false,
    } as IResponseBase<typeof undefined>);
  }
});

routerUser.delete(
  "/users/:id",
  AuthMiddleware.Authenticate,
  async (req, res) => {
    try {
      if (!req.params["id"] || Object.keys(req.params["id"]).length === 0) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "O params da requisição inválido",
          actionResult: false,
        } as IResponseBase<string>);
        return;
      }
      const id: number = parseInt(req.params["id"]);

      await dbQ
        .DELETE({ id: id })
        .then(() => {
          res.status(HttpStatus.OK).json({
            message: "Usuário deletado com sucesso",
            actionResult: false,
          } as IResponseBase<string>);
        })
        .catch((error) => {
          res.status(HttpStatus.NOT_FOUND).json({
            message: "Erro ao deletar usuário:" + error,
            actionResult: false,
          } as IResponseBase<string>);
        });
    } catch (error) {
      console.log(error);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: undefined,
        actionResult: false,
      } as IResponseBase<typeof undefined>);
    }
  }
);

routerUser.get("/users/:id", AuthMiddleware.Authenticate, async (req, res) => {
  try {
    if (!req.params["id"] || Object.keys(req.params["id"]).length === 0) {
      res.status(HttpStatus.BAD_REQUEST).json({
        data: "O params da requisição inválido",
        actionResult: false,
      } as IResponseBase<string>);
      return;
    }
    const id: number = parseInt(req.params["id"]);

    await dbQ
      .GET({ id: id })
      .then((data: IUsers) => {
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

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      data: undefined,
      actionResult: false,
    } as IResponseBase<typeof undefined>);
  }
});
routerUser.get("/users", AuthMiddleware.Authenticate, async (req, res) => {
  try {
    await dbQ
      .GETALL()
      .then((data) => {
        res.status(HttpStatus.OK).json({
          data: data,
          actionResult: true,
        } as IResponseBase<typeof data>);
      })
      .catch((error) => {
        res.status(HttpStatus.BAD_REQUEST).json({
          data: error,
          actionResult: false,
        } as IResponseBase<typeof error>);
      });
  } catch (error) {
    res.status(500).json({
      data: undefined,
      actionResult: false,
    } as IResponseBase<typeof undefined>);
  }
});

export default routerUser;
