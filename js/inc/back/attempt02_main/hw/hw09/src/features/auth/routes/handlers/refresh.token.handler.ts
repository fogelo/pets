import { Request, Response } from "express";
import { jwtService } from "../../application/jwt.service";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { userRepository } from "../../../users/repositories/users.repository";
import { devicesService } from "../../application/devices.service";

export const refreshTokenHandler = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  // 1) Проверяем, не в чёрном списке ли токен
  const revokedRefreshToken = await jwtService.findRefreshTokenInBlackList(
    refreshToken
  );
  if (revokedRefreshToken) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  // 2) Верифицируем токен
  const decoded = await jwtService.verifyRefreshToken(refreshToken);
  if (!decoded?.userId) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  // 3) **Проверяем, что сессия ещё жива**
  const session = await devicesService.findByDeviceId(decoded.deviceId);
  if (!session) {
    // после удаления /security/devices/:deviceId этого deviceId больше нет
    res.sendStatus(HttpStatus.Unauthorized);
    return 
  }

  //добавляем старый токен в черный список
  await jwtService.addRefreshTokenToBlackList(refreshToken);

  const user = await userRepository.findByIdOrFail(decoded.userId);
  // создаем новую пару токенов
  const newAccessToken = await jwtService.createAccessToken(
    user,
    decoded.deviceId
  );
  const newRefreshToken = await jwtService.createRefreshToken(
    user,
    decoded.deviceId
  );

  //обновляем девайс (сессию)
  const newRefresTokenDecoded = await jwtService.verifyRefreshToken(
    newRefreshToken
  );
  if (newRefresTokenDecoded) {
    await devicesService.updateByDeviceId(newRefresTokenDecoded.deviceId, {
      ...newRefresTokenDecoded,
      lastActiveDate: new Date(),
    });
  }

  // обновляем куку
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
  });

  res.status(HttpStatus.Ok).json({ accessToken: newAccessToken });
  return;
};
