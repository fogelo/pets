import { WithId } from "mongodb";
import { Device } from "../../types/device";
import { DeviceResponse } from "../../types/device.response";

export const mapToDeviceResponse = (device: WithId<Device>): DeviceResponse => {
  return {
    title: device.title,
    deviceId: device.deviceId,
    ip: device.ip,
    lastActiveDate: device.lastActiveDate,
  };
};
