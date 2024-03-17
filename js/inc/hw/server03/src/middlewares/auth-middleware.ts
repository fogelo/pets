import { Request, Response, NextFunction } from "express";
import { Status } from "../types";

const user = {
  login: "admin",
  password: "qwerty",
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  /* Простой вариант без декодирования
  if (authorization !== "Basic YWRtaW46cXdlcnR5") {
    res.sendStatus(401);
  }
*/

  if (!authorization) {
    res.sendStatus(Status.Unauthorized_401);
    return;
  }

  const [basic, token] = authorization?.split(" ");

  if (basic !== "Basic") {
    res.sendStatus(Status.Unauthorized_401);
    return;
  }

  const decodedToken = Buffer.from(token, "base64").toString();
  const [login, password] = decodedToken.split(":");

  if (login !== user.login || password !== user.password) {
    res.sendStatus(Status.Unauthorized_401);
    return;
  }

  return next();
};
