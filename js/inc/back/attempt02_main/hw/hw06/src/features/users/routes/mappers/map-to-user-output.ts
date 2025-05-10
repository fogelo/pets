import { WithId } from "mongodb";
import { User } from "../../domain/user";
import { UserOutput } from "../output/user.output";

export const mapToUserOutput = (user: WithId<User>): UserOutput => {
  return {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  };
};
