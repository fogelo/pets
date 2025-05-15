import { errorsHandler } from "../../../../core/errors/errors.handler";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { RequestWithBody } from "../../../../core/types/request-type";
import { usersService } from "../../../users/domain/users.service";
import { CreateUserRequestDTO } from "../../../users/types/create.user.request-dto";
import { authService } from "../../application/auth.service";
import { Response } from "express";

export const registrationHandler = async (
  req: RequestWithBody<CreateUserRequestDTO>,
  res: Response
) => {
  try {
    const existedUserByEmail = await usersService.findByEmail(req.body.email);
    const existedUserByLogin = await usersService.findByLogin(req.body.login);
    if (existedUserByEmail) {
      const error = {
        errorsMessages: [
          {
            message: "Пользователь с такими email уже существует",
            field: "email",
          },
        ],
      };
      res.status(HttpStatus.BadRequest).json(error);
      return;
    }

    if (existedUserByLogin) {
      const error = {
        errorsMessages: [
          {
            message: "Пользователь с такими email уже существует",
            field: "login",
          },
        ],
      };
      res.status(HttpStatus.BadRequest).json(error);
      return;
    }

    const { hash } = await authService._generateHashAndSalt(req.body.password);

    const user = await authService.createUser({
      login: req.body.login,
      email: req.body.email,
      passwordHash: hash,
    });

    if (user) {
      res.status(HttpStatus.NoContent).json(user);
    } else {
      res.sendStatus(HttpStatus.BadRequest);
    }
    return;
  } catch (err) {
    errorsHandler(err, res);
  }
};
