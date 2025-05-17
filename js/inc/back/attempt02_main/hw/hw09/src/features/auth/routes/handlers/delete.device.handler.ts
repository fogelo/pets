import express from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { devicesService } from "../../application/devices.service";
import { jwtService } from "../../application/jwt.service";
import { usersService } from "../../../users/domain/users.service";

export const deleteDeviceHandler = async (
  req: express.Request<{ id: string }>,
  res: express.Response
) => {
  try {
    const deviceId = req.params.id;

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
    const user = await usersService.findByIdOrFail(decoded.userId);
    const device = await devicesService.findByDeviceId(deviceId);

    if (!device) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }

    if (device?.userId !== user?._id.toString()) {
      // запрещаем удалять не свои девайсы
      res.sendStatus(HttpStatus.Forbidden);
      return;
    }

    await devicesService.deleteByDeviceId(deviceId);
    res.sendStatus(HttpStatus.NoContent);
    return;
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
