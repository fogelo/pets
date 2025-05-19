import { ObjectId, WithId } from "mongodb";
import { usersCollection } from "../../../db/db";
import { RepositoryNotFoundError } from "../../../core/errors/repository-not-found.error";
import { User } from "../types/user";
import { QueryUserRequestDTO } from "../types/query.user.request-dto";
import { UpdateUserDTO } from "../types/update.user.dto";

export const userRepository = {
  async findMany(
    queryDto: QueryUserRequestDTO
  ): Promise<{ items: WithId<User>[]; totalCount: number }> {
    const {
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
      searchLoginTerm,
      searchEmailTerm,
    } = queryDto;

    const skip = (pageNumber - 1) * pageSize;
    const filter: any = {};

    // Собираем условия поиска
    const orConditions = [];
    if (searchLoginTerm) {
      orConditions.push({ login: { $regex: searchLoginTerm, $options: "i" } });
    }
    if (searchEmailTerm) {
      orConditions.push({ email: { $regex: searchEmailTerm, $options: "i" } });
    }
    if (orConditions.length > 0) {
      // Объединяем с помощью $or
      filter.$or = orConditions;
    }

    const items = await usersCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await usersCollection.countDocuments(filter);

    return { items, totalCount };
  },
  async findByIdOrFail(id: string): Promise<WithId<User>> {
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    if (!user) {
      throw new RepositoryNotFoundError("User not exist");
    }
    return user;
  },
  async findById(id: string): Promise<WithId<User> | null> {
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    return user;
  },
  async findByLoginOrEmail(loginOrEmail: string): Promise<WithId<User> | null> {
    const user = await usersCollection.findOne({
      $or: [
        { "accountData.login": loginOrEmail },
        { "accountData.email": loginOrEmail },
      ],
    });
    return user;
  },
  async findByEmailOrLogin(
    email: string,
    login: string
  ): Promise<WithId<User> | null> {
    const user = await usersCollection.findOne({
      $or: [{ "accountData.login": login }, { "accountData.email": email }],
    });
    return user;
  },
  async findByCode(code: string): Promise<WithId<User> | null> {
    const user = await usersCollection.findOne({
      "emailConfirmation.confirmationCode": code,
    });
    return user;
  },
  async findByEmail(email: string): Promise<WithId<User> | null> {
    const user = await usersCollection.findOne({
      "accountData.email": email,
    });
    return user;
  },
  async findByLogin(login: string): Promise<WithId<User> | null> {
    const user = await usersCollection.findOne({
      "accountData.login": login,
    });
    return user;
  },
  async create(newUser: User): Promise<string> {
    const insertResult = await usersCollection.insertOne(newUser);
    return insertResult.insertedId.toString();
  },
  async update(id: string, dto: UpdateUserDTO): Promise<void> {
    const updateResult = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: dto }
    );
    if (updateResult.matchedCount < 1) {
      throw new RepositoryNotFoundError("User not exist");
    }

    return;
  },
  async updateIsConfirmed(_id: ObjectId): Promise<void> {
    const updateResult = await usersCollection.updateOne(
      { _id },
      { $set: { "emailConfirmation.isConfirmed": true } }
    );
    if (updateResult.matchedCount < 1) {
      throw new RepositoryNotFoundError("User not exist");
    }
    return;
  },
  async updatePasswordHash(_id: ObjectId, passwordHash: string): Promise<void> {
    const updateResult = await usersCollection.updateOne(
      { _id },
      { $set: { "accountData.passwordHash": passwordHash} }
    );
    if (updateResult.matchedCount < 1) {
      throw new RepositoryNotFoundError("User not exist");
    }
    return;
  },
  async updateConfirmationCode(_id: ObjectId, code: string): Promise<void> {
    const updateResult = await usersCollection.updateOne(
      { _id },
      { $set: { "emailConfirmation.confirmationCode": code } }
    );
    if (updateResult.matchedCount < 1) {
      throw new RepositoryNotFoundError("User not exist");
    }
    return;
  },
  async delete(id: string): Promise<void> {
    const deleteResult = await usersCollection.deleteOne({
      _id: new ObjectId(id),
    });
    if (deleteResult.deletedCount < 1) {
      throw new RepositoryNotFoundError("User not exist");
    }
    return;
  },
};
