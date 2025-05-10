import { WithId } from "mongodb";
import { User } from "../domain/user";
import { userRepository } from "../repositories/users.repository";
import { UserQueryInput } from "../routes/input/user-query.input";
import { UserAttributes } from "./dtos/user.attributes";

export const usersService = {
  async findMany(
    queryDto: UserQueryInput
  ): Promise<{ items: WithId<User>[]; totalCount: number }> {
    const users = userRepository.findMany(queryDto);
    return users;
  },
  async findByIdOrFail(id: string): Promise<WithId<User>> {
    return userRepository.findByIdOrFail(id);
  },
  async create(dto: UserAttributes): Promise<string> {
    const newUser = {
      login: dto.login,
      email: dto.email,
      createdAt: new Date(),
    };
    const createdUserId = userRepository.create(newUser);
    return createdUserId;
  },
  async update(id: string, dto: UserAttributes): Promise<void> {
    await userRepository.update(id, dto);
    return;
  },
  async delete(id: string): Promise<void> {
    return userRepository.delete(id);
  },
};
