import express from "express";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { devicesService } from "../../application/devices.service";
import { mapToDeviceResponse } from "../mappers/map-to-device-response";

export const getUserDeviceListHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const devices = await devicesService.findMany(req.user?.id!);

    res.status(HttpStatus.Ok).json(devices.map(mapToDeviceResponse));
    return;
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
