import { WithId } from "mongodb";
import { deviceRepository } from "../repositories/devices.repository";
import { Device } from "../types/device";
import { CreateDeviceInputDTO } from "../types/create.device.input-dto";

export const devicesService = {
  async findMany(userId: string): Promise<WithId<Device>[]> {
    const result = deviceRepository.findMany(userId);
    return result;
  },
  async findByDeviceId(deviceId: string): Promise<WithId<Device> | null> {
    const result = deviceRepository.findDeviceById(deviceId);
    return result;
  },

  async create(dto: CreateDeviceInputDTO): Promise<string> {
    const newDevice = {
      ip: dto.ip!,
      url: dto.url,
      lastActiveDate: dto.lastActiveDate,
      title: dto.title,
      deviceId: dto.deviceId,
      userId: dto.userId,
      iat: dto?.iat,
      exp: dto?.exp,
    };
    const createdDeviceId = deviceRepository.create(newDevice);
    return createdDeviceId;
  },
  async update(id: string, dto: any): Promise<void> {
    await deviceRepository.update(id, dto);
    return;
  },

  async updateByDeviceId(
    deviceId: string,
    inputDto: {
      iat?: number;
      exp?: number;
      userId?: string;
      lastActiveDate: Date;
    }
  ): Promise<void> {
    await deviceRepository.updateByDeviceId(deviceId, inputDto);
    return;
  },
  async delete(id: string): Promise<void> {
    return deviceRepository.delete(id);
  },
  async deleteByDeviceId(deviceId: string): Promise<void> {
    return deviceRepository.deleteByDeviceId(deviceId);
  },
  async deleteAllUserDevices(userId: string): Promise<void> {
    return deviceRepository.deleteMany({ userId });
  },
};
