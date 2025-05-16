import { Request, Response } from "express";
import { jwtService } from "../../application/jwt.service";
import { HttpStatus } from "../../../../core/types/http-statuses";

export const logoutHandler = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  const userId = await jwtService.verifyRefreshToken(refreshToken);
  if (!userId) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  const revokedToken = await jwtService.findRefreshTokenInBlackList(
    refreshToken
  );

  if (revokedToken) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  //добавляем старый токен в черный список
  await jwtService.addRefreshTokenToBlackList(refreshToken);

  res.sendStatus(HttpStatus.NoContent);
  return;
};
