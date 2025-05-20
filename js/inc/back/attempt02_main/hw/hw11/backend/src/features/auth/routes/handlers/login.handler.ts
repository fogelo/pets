import { Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { usersService } from "../../../users/domain/users.service";
import { jwtService } from "../../application/jwt.service";
import { RequestWithBody } from "../../../../core/types/request-type";
import { devicesService } from "../../application/devices.service";
import { v4 as uuidv4 } from "uuid";

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

  const uaString = req.get("User-Agent") || "noname";
  const deviceId = uuidv4();

  // 2) Генерируем пару токенов
  const accessToken = await jwtService.createAccessToken(user, deviceId);
  const refreshToken = await jwtService.createRefreshToken(user, deviceId);

  //обновляем девайс (сессию)
  const newRefresTokenDecoded = await jwtService.verifyRefreshToken(
    refreshToken
  );
  const deviceDto = {
    ip: req.ip!,
    url: req.originalUrl,
    title: uaString,
    deviceId,
    userId: user._id.toString(),
    lastActiveDate: new Date(),
    iat: newRefresTokenDecoded?.iat,
    exp: newRefresTokenDecoded?.exp,
  };

  await devicesService.create(deviceDto);

  // 3) Кладём refreshToken в HttpOnly-куку
  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });

  // 4) Кладём accessToken в тело ответа и отправляем ответ клиенту
  res.status(HttpStatus.Ok).send({
    accessToken,
  });
  return;
};
