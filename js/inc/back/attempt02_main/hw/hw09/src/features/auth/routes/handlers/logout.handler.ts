import { Request, Response } from "express";
import { jwtService } from "../../application/jwt.service";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { devicesService } from "../../application/devices.service";

export const logoutHandler = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  const decoded = await jwtService.verifyRefreshToken(refreshToken);
  if (!decoded?.userId) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  const revokedToken = await jwtService.findRefreshTokenInBlackList(
    refreshToken
  );

  if (revokedToken) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  await devicesService.deleteByDeviceId(decoded.deviceId);
  //добавляем старый токен в черный список
  await jwtService.addRefreshTokenToBlackList(refreshToken);

  res.sendStatus(HttpStatus.NoContent);
  return;
};
