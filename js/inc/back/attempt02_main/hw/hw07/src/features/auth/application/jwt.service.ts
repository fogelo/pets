import { ObjectId, WithId } from "mongodb";
import jwt from "jsonwebtoken";
import { SETTINGS } from "../../../core/settings/settings";
import { User } from "../../users/types/user";

export const jwtService = {
  async createJWT(user: WithId<User>): Promise<string> {
    const token = jwt.sign({ userId: user._id }, SETTINGS.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  },

  async getUserIdByToken(token: string): Promise<ObjectId | null> {
    try {
      const payload = jwt.verify(token, SETTINGS.JWT_SECRET) as {
        userId: string;
      };
      return new ObjectId(payload.userId);
    } catch(err) {
      return null;
    }
  },
};
