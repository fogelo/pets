import { DbManager } from "../../db/db";
import { DbUserModel } from "./models/DbUserModel";

export const usersRepository = {
  async findUsers(login: string | undefined) {
    if (login) {
      const filteredUsers = DbManager.getUsersCollection()
        .find({ login: { $regex: login } })
        .toArray();
      return filteredUsers;
    } else {
      return DbManager.getUsersCollection().find().toArray();
    }
  },
  async findUserById(id: number) {
    return DbManager.getUsersCollection().findOne({ id });
  },
  async findUserByLogin(login: string) {
    return DbManager.getUsersCollection().findOne({ login });
  },
  async createUser(user: DbUserModel) {
    const result = await DbManager.getUsersCollection().insertOne(user);
    return user;
  },
  async updateUser(id: number, login: string) {
    const result = await DbManager.getUsersCollection().updateOne(
      { id },
      { $set: { login } }
    );
    const isUpdated = result.matchedCount === 1;
    return isUpdated;
  },
  async deleteUser(id: number) {
    const result = await DbManager.getUsersCollection().deleteOne({ id });
    const isDeleted = result.deletedCount === 1;
    return isDeleted;
  },
};
