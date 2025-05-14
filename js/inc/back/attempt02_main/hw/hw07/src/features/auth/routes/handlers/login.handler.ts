import { Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { usersService } from "../../../users/domain/users.service";
import { jwtService } from "../../application/jwt.service";
import { RequestWithBody } from "../../../../core/types/request-type";

export const loginHandler = async (
  req: RequestWithBody<{
    loginOrEmail: string;
    password: string;
  }>,
  res: Response
) => {
  const user = await usersService.checkCredentials(
    req.body.loginOrEmail,
    req.body.password
  );
  if (user) {
    const token = await jwtService.createJWT(user);
    res.status(HttpStatus.Ok).send({
      accessToken: token,
    });
  } else {
    res.sendStatus(HttpStatus.Unauthorized);
  }
};
