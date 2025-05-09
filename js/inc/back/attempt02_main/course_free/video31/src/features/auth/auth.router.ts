import express from "express";
import { userService } from "../users/user.service";

export const authRouter: express.Router = express.Router();

authRouter.post(
  "/login",
  async (req: express.Request, res: express.Response) => {
    const checkResult = await userService.checkCredentials(
      req.body.login,
      req.body.password
    );
  }
);
