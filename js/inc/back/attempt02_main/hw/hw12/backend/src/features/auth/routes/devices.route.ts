import { Router } from "express";
import { getUserDeviceListHandler } from "./handlers/get-device-list.handler";
import { deleteAllUserDevicesHandler } from "./handlers/delete.all-user.devices.handler";
import { deleteDeviceHandler } from "./handlers/delete.device.handler";

export const devicesRouter: Router = Router({});

devicesRouter
  .get("", getUserDeviceListHandler)
  .delete("", deleteAllUserDevicesHandler)
  .delete("/:id", deleteDeviceHandler);
