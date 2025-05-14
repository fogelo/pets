import { HttpStatus } from "../../../../core/types/http-statuses";
import { RequestWithBody } from "../../../../core/types/request-type";
import { CreateUserRequestDTO } from "../../../users/types/create.user.request-dto";
import { authService } from "../../application/auth.service";
import { Response } from "express";

export const registrationHandler = async (
  req: RequestWithBody<CreateUserRequestDTO>,
  res: Response
) => {
  const { hash, salt } = await authService._generateHashAndSalt(
    req.body.password
  );
  const user = await authService.createUser({
    login: req.body.login,
    email: req.body.email,
    passwordHash: hash,
    passwordSalt: salt,
  });

  if (user) {
    res.status(HttpStatus.NoContent).json(user);
  } else {
    res.sendStatus(HttpStatus.InternalServerError);
  }
  return;
};
