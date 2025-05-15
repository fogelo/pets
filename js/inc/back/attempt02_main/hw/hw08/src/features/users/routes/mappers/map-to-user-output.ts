import { WithId } from "mongodb";
import { User } from "../../types/user";
import { UserResponse } from "../../types/user.response";

export const mapToUserResponse = (user: WithId<User>): UserResponse => {
  return {
    id: user._id.toString(),
    login: user.accountData.login,
    email: user.accountData.email,
    createdAt: user.accountData.createdAt,
  };
};
