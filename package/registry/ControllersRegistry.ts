import { Request, Response, NextFunction } from "express";
export const ControllersRegistry = {
  loginWithPassword: (req: Request, res: Response) => {
    return res.status(200).json({ message: "Login with password API called." });
  },
  checkLoginOrRegister: (req: Request, res: Response) => {
    return res.status(200).json({ message: "checkLoginOrRegister." });
  },
};
