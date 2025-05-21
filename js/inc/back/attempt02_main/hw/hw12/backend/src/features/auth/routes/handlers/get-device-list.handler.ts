import express from "express";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { devicesService } from "../../application/devices.service";
import { mapToDeviceResponse } from "../mappers/map-to-device-response";
import { jwtService } from "../../application/jwt.service";

export const getUserDeviceListHandler = async (
  req: express.Request,
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

    const devices = await devicesService.findMany(decoded.userId);

    res.status(HttpStatus.Ok).json(devices.map(mapToDeviceResponse));
    return;
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
