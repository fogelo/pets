import { WithId } from "mongodb";
import { UserDbModel } from "../db/user.db.model";

export const userMapper = (
  user: WithId<UserDbModel>
): Omit<UserDbModel, "_id" | "password"> & { id: string } => {
  return {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  };
};
