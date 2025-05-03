import express from "express";

export const authorizationMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.sendStatus(401);
    return;
  }

  // Разбиваем на [схема, credentials]
  const [scheme, credentials] = authorization.split(" ");
  if (scheme !== "Basic" || !credentials) {
    res.sendStatus(401);
    return;
  }

  // Декодируем и получаем [login, password]
  const [login, password] = Buffer.from(credentials, "base64")
    .toString("utf-8")
    .split(":");

  // Проверяем
  if (login !== "admin" || password !== "qwerty") {
    res.sendStatus(401);
    return;
  }
  next();
};
