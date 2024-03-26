import { Status } from "../models/common";
import { UserDbModel } from "../models/db/user.db.model";
import { CreateUserInputModel } from "../models/input/user/create.user.input.model";
import { UserOutputModel } from "../models/output/user.output.model";
import { UserRepository } from "../repositories/user.repositoty";

export class UserService {
  static async createUser(
    userData: CreateUserInputModel
  ): Promise<UserOutputModel | null> {
    const newUser: UserDbModel = {
      login: userData.login,
      email: userData.email,
      password: userData.password,
      createdAt: new Date().toISOString(),
    };

    const userId = await UserRepository.createUser(newUser);
    const user = await UserRepository.getUserById(userId);

    if (!user) {
      return null;
    }
    return user;
  }
}
