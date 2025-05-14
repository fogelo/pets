import { Request, Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { usersService } from "../../../users/domain/users.service";
import { jwtService } from "../../application/jwt.service";

export const loginHandler = async (req: Request, res: Response) => {
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
