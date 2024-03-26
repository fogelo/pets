import { Filter, ObjectId } from "mongodb";
import { UserDbModel } from "../models/db/user.db.model";
import { QueryUserInputModel } from "../models/input/user/query.user.input.model";
import { usersCollection } from "../db/db";
import { UserOutputModel } from "../models/output/user.output.model";
import { Pagination } from "../models/common";
import { userMapper } from "../models/mappers/user.mapper";

export class UserRepository {
  static async getUsers(
    sortData: Required<QueryUserInputModel>
  ): Promise<Pagination<UserOutputModel>> {
    const {
      searchEmailTerm,
      searchLoginTerm,
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
    } = sortData;

    const filter: Filter<UserDbModel> = {};
    const filters = [];

    if (searchEmailTerm) {
      filters.push({ email: { $regex: searchEmailTerm, $options: "i" } });
    }

    if (searchLoginTerm) {
      filters.push({ login: { $regex: searchLoginTerm, $options: "i" } });
    }

    if (filters.length > 0) {
      filter.$and = filters;
    }

    const users = await usersCollection
      .find(filter)
      .sort(sortBy, sortDirection)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    const totalCount = await usersCollection.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    const result: Pagination<UserOutputModel> = {
      pagesCount,
      page: pageNumber,
      pageSize,
      totalCount,
      items: users.map(userMapper),
    };

    return result;
  }
  static async getUserById(id: string) {
    const user = await usersCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!user) return null;
    return userMapper(user);
  }
  static async checkCredentials(
    loginOrEmail: string
  ): Promise<UserDbModel | null> {
    const user = await usersCollection.findOne({
      $or: [{ login: loginOrEmail }, { email: loginOrEmail }],
    });
    if (!user) {
      return null;
    }
    return user;
  }
  static async createUser(user: UserDbModel): Promise<string> {
    const res = await usersCollection.insertOne(user);
    return res.insertedId.toString();
  }
  static async deleteUser(id: string) {
    const res = await usersCollection.deleteOne({ _id: new ObjectId(id) });
    return !!res.deletedCount;
  }
}
