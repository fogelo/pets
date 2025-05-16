import express from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { devicesService } from "../../application/devices.service";

export const deleteDeviceHandler = async (
  req: express.Request<{ id: string }>,
  res: express.Response
) => {
  try {
    const deviceId = req.params.id;
    if (!deviceId) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }

    const user = req.user;
    const device = await devicesService.findByDeviceId(deviceId);

    if (!device) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }

    if (device?.userId !== user?.id) {
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
