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
  // 1) Проверяем логин/пароль
  const user = await usersService.checkCredentials(
    req.body.loginOrEmail,
    req.body.password
  );
  if (!user) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  // 2) Генерируем пару токенов
  const accessToken = await jwtService.createAccessToken(user);
  const refreshToken = await jwtService.createRefreshToken(user);

  // 3) Кладём refreshToken в HttpOnly-куку
  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });

  // 4) Кладём accessToken в тело ответа и отправляем ответ клиенту
  res.status(HttpStatus.Ok).send({
    accessToken,
  });
  return;
};
