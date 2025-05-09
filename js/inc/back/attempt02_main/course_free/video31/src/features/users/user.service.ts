import bcrypt from "bcrypt";
import { DbUserModel } from "./models/DbUserModel";
import { usersRepository } from "./user.repository";

export const userService = {
  async findUsers(login?: string) {
    const filteredUsers = usersRepository.findUsers(login);
    return filteredUsers;
  },
  async findUserById(id: number) {
    return usersRepository.findUserById(id);
  },
  async createUser({
    login,
    email,
    password,
  }: {
    login: string;
    email: string;
    password: string;
  }) {
    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await this._generateHash(password, passwordSalt);

    const newUser: DbUserModel = {
      id: +new Date(),
      login,
      email,
      passwordHash,
      passwordSalt,
      createdAt: new Date(),
    };
    return usersRepository.createUser(newUser);
  },
  async updateUser(id: number, login: string) {
    const isUpdated = await usersRepository.updateUser(id, login);
    return isUpdated;
  },
  async deleteUser(id: number) {
    const isDeleted = await usersRepository.deleteUser(id);
    return isDeleted;
  },
  async checkCredentials(login: string, password: string) {
    const user = await usersRepository.findUserByLogin(login);
    if (!user) return false;
    const passwordHash = await this._generateHash(password, user.passwordSalt);
    if (user.passwordHash !== passwordHash) return false;
    return true;
  },
  async _generateHash(password: string, salt: string) {
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },
};
