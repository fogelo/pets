import { ObjectId, WithId } from "mongodb";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SETTINGS } from "../../../core/settings/settings";
import { User } from "../../users/types/user";
import { authRepository } from "../repositories/auth.repository";
import { RevokedToken } from "../types/revoked-token";

export const jwtService = {
  async createAccessToken(
    user: WithId<User>,
    deviceId: string
  ): Promise<string> {
    const token = jwt.sign(
      { userId: user._id, deviceId },
      SETTINGS.JWT_ACCESS_SECRET,
      {
        expiresIn: "10s",
      }
    );

    return token;
  },
  async createRefreshToken(
    user: WithId<User>,
    deviceId: string
  ): Promise<string> {
    const token = jwt.sign(
      { userId: user._id, deviceId },
      SETTINGS.JWT_REFRESH_SECRET,
      {
        expiresIn: "20s",
      }
    );

    return token;
  },
  async verifyRefreshToken(token: string): Promise<
    | (JwtPayload & {
        userId: string;
        deviceId: string;
      })
    | null
  > {
    try {
      const decoded = jwt.verify(
        token,
        SETTINGS.JWT_REFRESH_SECRET
      ) as JwtPayload & {
        userId: string;
        deviceId: string;
      };
      return decoded;
    } catch {
      return null;
    }
  },
  async getUserIdByAccessToken(token: string): Promise<ObjectId | null> {
    try {
      const payload = jwt.verify(token, SETTINGS.JWT_ACCESS_SECRET) as {
        userId: string;
        deviceId: string;
      };
      return new ObjectId(payload.userId);
    } catch (err) {
      return null;
    }
  },
  async findRefreshTokenInBlackList(
    token: string
  ): Promise<RevokedToken | null> {
    return authRepository.findRevokedToken(token);
  },

  async addRefreshTokenToBlackList(token: string): Promise<string | null> {
    return authRepository.create({ token });
  },
};
