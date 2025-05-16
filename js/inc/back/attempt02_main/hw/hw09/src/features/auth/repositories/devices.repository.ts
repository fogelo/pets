import { ObjectId, WithId } from "mongodb";
import { devicesCollection } from "../../../db/db";
import { Device } from "../types/device";
import { RepositoryNotFoundError } from "../../../core/errors/repository-not-found.error";

export const deviceRepository = {
  async findMany(userId: string): Promise<WithId<Device>[]> {
    const filter: any = { userId: userId };
    const items = await devicesCollection.find(filter).toArray();
    return items;
  },
  async findDeviceById(deviceId: string): Promise<WithId<Device> | null> {
    return devicesCollection.findOne({ deviceId });
  },
  async create(newBlog: Device | any): Promise<string> {
    const insertResult = await devicesCollection.insertOne(newBlog);
    return insertResult.insertedId.toString();
  },
  async update(id: string, dto: any): Promise<void> {
    const updateResult = await devicesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: dto }
    );
    if (updateResult.matchedCount < 1) {
      throw new RepositoryNotFoundError("Device not exist");
    }

    return;
  },
  async updateByDeviceId(deviceId: string, dto: any): Promise<void> {
    const updateResult = await devicesCollection.updateOne(
      { deviceId },
      { $set: dto }
    );
    if (updateResult.matchedCount < 1) {
      throw new RepositoryNotFoundError("Device not exist");
    }

    return;
  },
  async delete(id: string): Promise<void> {
    const deleteResult = await devicesCollection.deleteOne({
      _id: new ObjectId(id),
    });
    if (deleteResult.deletedCount < 1) {
      throw new RepositoryNotFoundError("Device not exist");
    }
    return;
  },
  async deleteByDeviceId(deviceId: string): Promise<void> {
    const deleteResult = await devicesCollection.deleteOne({
      deviceId,
    });
    if (deleteResult.deletedCount < 1) {
      throw new RepositoryNotFoundError("Device not exist");
    }
    return;
  },
  async deleteMany(dto: any): Promise<void> {
    const deleteResult = await devicesCollection.deleteMany(dto);
    if (deleteResult.deletedCount < 1) {
      throw new RepositoryNotFoundError("Device not exist");
    }
    return;
  },
};
