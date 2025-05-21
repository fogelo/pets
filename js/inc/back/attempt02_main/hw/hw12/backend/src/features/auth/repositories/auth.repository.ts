import { WithId } from "mongodb";
import { revokedRefreshTokensCollection } from "../../../db/db";
import { RevokedToken } from "../types/revoked-token";

export const authRepository = {
  async findRevokedToken(token: string): Promise<WithId<RevokedToken> | null> {
    const revokedToken = await revokedRefreshTokensCollection.findOne({
      token: token,
    });
    return revokedToken;
  },
  async create(newToken: RevokedToken): Promise<string> {
    const insertResult = await revokedRefreshTokensCollection.insertOne(
      newToken
    );
    return insertResult.insertedId.toString();
  },
};
