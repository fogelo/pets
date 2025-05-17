import { NextFunction, Request, Response } from "express";
import { jwtService } from "./application/jwt.service";
import { mapToUserResponse } from "../users/routes/mappers/map-to-user-output";
import { UserResponse } from "../users/types/user.response";
import { usersService } from "../users/domain/users.service";
import { HttpStatus } from "../../core/types/http-statuses";
import { devicesService } from "./application/devices.service";

declare global {
  namespace Express {
    interface Request {
      user?: UserResponse;
    }
  }
}

export const authMiddleware = async (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // 1) Попытка достать accessToken
  const authHeader = req.headers.authorization;
  let accessToken = authHeader?.split(" ")[1] || null;
  // if (!token) {
  //   res.sendStatus(HttpStatus.Unauthorized);
  //   return;
  // }

  // 2) Если accessToken есть — проверяем его
  if (accessToken) {
    const userId = await jwtService.getUserIdByAccessToken(accessToken);
    if (userId) {
      const user = await usersService.findByIdOrFail(userId.toString());
      if (user) {
        req.user = mapToUserResponse(user);
        next();
        return;
      }
    }
    // Если токен просрочен или неверен — сбросим его и пойдём дальше
    accessToken = null;
  }

  // 3) Работаем с refreshToken из куки
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  // 4) Проверяем, не в чёрном списке ли он
  const isRevoked = await jwtService.findRefreshTokenInBlackList(refreshToken);
  if (isRevoked) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  // 5) Верифицируем refreshToken и получаем payload
  const payload = await jwtService.verifyRefreshToken(refreshToken);
  if (!payload?.userId || !payload.deviceId) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  // 6) Ищем пользователя и сессию
  const user = await usersService.findByIdOrFail(payload.userId);
  const session = await devicesService.findByDeviceId(payload.deviceId);
  if (!user || !session) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  // 7) Генерируем новую пару токенов
  const newAccessToken = await jwtService.createAccessToken(
    user,
    payload.deviceId
  );
  const newRefreshToken = await jwtService.createRefreshToken(
    user,
    payload.deviceId
  );

  // 8) Помещаем старый refreshToken в чёрный список
  await jwtService.addRefreshTokenToBlackList(refreshToken);

  // 9) Обновляем дату активности и новый iat/exp в сессии
  const decodedNew = await jwtService.verifyRefreshToken(newRefreshToken);
  await devicesService.updateByDeviceId(payload.deviceId, {
    lastActiveDate: new Date(),
    iat: decodedNew?.iat,
    exp: decodedNew?.exp,
  });

  // 10) Отправляем куку с новым refreshToken
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
  });

  // 11) Пишем новый accessToken в заголовок для клиента
  res.setHeader("Authorization", `Bearer ${newAccessToken}`);

  // 12) Устанавливаем req.user и пропускаем дальше
  req.user = mapToUserResponse(user);
  next();
  return;
};
