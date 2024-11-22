// import { Request, Response } from "express";
// import { AuthService } from "../services/AuthService";

// export class AuthController {
//   static async Register(req: Request, res: Response) {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) {
//         return res.status(400).json({ message: "Email e senha são obrigatórios." });
//       }

//       await AuthService.register(email, password);
//       res.status(201).json({ message: "Usuário registrado com sucesso!" });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }

//   static async login(req: Request, res: Response) {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) {
//         return res.status(400).json({ message: "Email e senha são obrigatórios." });
//       }

//       const token = await AuthService.Login(email, password);

//       res.cookie("authToken", token, { httpOnly: true, secure: false });
//       res.json({ message: "Login bem-sucedido!" });
//     } catch (error) {
//       res.status(401).json({ message: error.message });
//     }
//   }

//   static async Logout(req: Request, res: Response) {
//     res.clearCookie("authToken");
//     res.json({ message: "Logout realizado com sucesso." });
//   }
// }
