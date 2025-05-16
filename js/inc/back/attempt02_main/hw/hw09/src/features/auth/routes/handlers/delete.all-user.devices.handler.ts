import express from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { devicesService } from "../../application/devices.service";

export const deleteAllUserDevicesHandler = async (
  req: express.Request<{ id: string }>,
  res: express.Response
) => {
  try {
    await devicesService.deleteAllUserDevices(req.user?.id!);
    res.sendStatus(HttpStatus.NoContent);
    return;
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
