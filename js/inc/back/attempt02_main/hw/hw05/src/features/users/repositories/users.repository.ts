import { ObjectId, WithId } from "mongodb";
import { User } from "../domain/user";
import { usersCollection } from "../../../db/db";
import { RepositoryNotFoundError } from "../../../core/errors/repository-not-found.error";
import { UserQueryInput } from "../routes/input/user-query.input";
import { UserAttributes } from "../application/dtos/user.attributes";

export const userRepository = {
  async findMany(queryDto: UserQueryInput): Promise<WithId<User>[]> {
    const { ids } = queryDto;
    const filter: any = {};

    if (ids && ids.length) {
      const objectIds = ids.map((id) => new ObjectId(id));
      filter._id = { $in: objectIds };
    }

    const result = await usersCollection.find(filter).toArray();
    return result;
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
