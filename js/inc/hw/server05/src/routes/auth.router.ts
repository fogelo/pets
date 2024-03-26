import { Response, Router } from "express";
import { inputValidationMiddleware } from "../middlewares/input.validation.middleware";
import { RequestWithBody, Status } from "../models/common";
import { LoginInputModel } from "../models/input/auth/login.input.model";
import { UserRepository } from "../repositories/user.repositoty";
import { loginValidation } from "../validators/login.validators";

export const authRouter = Router();

authRouter.post(
  "/login",
  loginValidation(),
  inputValidationMiddleware,
  async (req: RequestWithBody<LoginInputModel>, res: Response) => {
    const { loginOrEmail, password } = req.body;
    const user = await UserRepository.checkCredentials(loginOrEmail);

    if (user?.password === password) {
      return res.sendStatus(Status.NoContent_204);
    }

    return res.sendStatus(Status.Unauthorized_401);
  }
);
