import { Router, Response } from "express";
import { RequestWithBody, Status } from "../models/common";
import { LoginInputModel } from "../models/input/auth/login.input.model";
import { UserRepository } from "../repositories/user.repositoty";

export const authRouter = Router();

authRouter.get(
  "/login",
  async (req: RequestWithBody<LoginInputModel>, res: Response) => {
    const { loginOrEmail, password } = req.body;
    const user = await UserRepository.checkCredentials(loginOrEmail);
    console.log(user, password);

    if (user?.password === password) {
      return res.sendStatus(Status.NoContent_204);
    }

    return res.sendStatus(Status.BadRequest_400);
  }
);
