import express from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { devicesService } from "../../application/devices.service";
import { jwtService } from "../../application/jwt.service";

export const deleteAllUserDevicesHandler = async (
  req: express.Request<{ id: string }>,
  res: express.Response
) => {
  try {
    // работаем с refreshToken из куки
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.sendStatus(HttpStatus.Unauthorized);
      return;
    }

    const decoded = await jwtService.verifyRefreshToken(refreshToken);
    if (!decoded) {
      res.sendStatus(HttpStatus.Unauthorized);
      return;
    }

    await devicesService.deleteAllUserDevices(decoded.userId);
    res.sendStatus(HttpStatus.NoContent);
    return;
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
