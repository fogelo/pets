import { add } from "date-fns";
import { WithId } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import { userRepository } from "../repositories/users.repository";
import { CreateUserInputDTO } from "../types/create.user.input-dto";
import { QueryUserRequestDTO } from "../types/query.user.request-dto";
import { UpdateUserDTO } from "../types/update.user.dto";
import { User } from "../types/user";
import { DbUser } from "../types/db-user";

export const usersService = {
  async findMany(
    dto: QueryUserRequestDTO
  ): Promise<{ items: WithId<DbUser>[]; totalCount: number }> {
    const users = userRepository.findMany(dto);
    return users;
  },
  async findByIdOrFail(id: string): Promise<WithId<DbUser>> {
    return userRepository.findByIdOrFail(id);
  },
  async findById(id: string): Promise<WithId<DbUser> | null> {
    return userRepository.findById(id);
  },
  async create(dto: CreateUserInputDTO): Promise<string> {
    const newUser: User = {
      accountData: {
        login: dto.login,
        email: dto.email,
        passwordHash: dto.passwordHash,
        passwordSalt: dto.passwordSalt,
        createdAt: new Date(),
      },
      emailConfirmation: {
        confirmationCode: uuidv4(),
        expirationDate: add(new Date(), { hours: 1 }),
        isConfirmed: false,
      },
    };
    const createdUserId = userRepository.create(newUser);
    return createdUserId;
  },
  async update(id: string, dto: UpdateUserDTO): Promise<void> {
    await userRepository.update(id, dto);
    return;
  },
  async delete(id: string): Promise<void> {
    return userRepository.delete(id);
  },
  async checkCredentials(
    loginOrEmail: string,
    password: string
  ): Promise<WithId<User> | null> {
    return userRepository.findByLoginOrEmailAndPassword(loginOrEmail, password);
  },
  async findByEmail(
    email: string,
  ): Promise<WithId<User> | null> {
    return userRepository.findByEmail(email);
  },
};
