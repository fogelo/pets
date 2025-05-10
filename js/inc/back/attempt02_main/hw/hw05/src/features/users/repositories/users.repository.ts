import { ObjectId, WithId } from "mongodb";
import { User } from "../domain/user";
import { usersCollection } from "../../../db/db";
import { RepositoryNotFoundError } from "../../../core/errors/repository-not-found.error";
import { UserQueryInput } from "../routes/input/user-query.input";
import { UserAttributes } from "../application/dtos/user.attributes";

export const userRepository = {
  async findMany(
    queryDto: UserQueryInput
  ): Promise<{ items: WithId<User>[]; totalCount: number }> {
    const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm } =
      queryDto;

    const skip = (pageNumber - 1) * pageSize;
    const filter: any = {};

    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: "i" };
    }

    const items = await usersCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection })
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
  async create(newUser: User): Promise<string> {
    const insertResult = await usersCollection.insertOne(newUser);
    return insertResult.insertedId.toString();
  },
  async update(id: string, dto: UserAttributes): Promise<void> {
    const updateResult = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: dto }
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
