import { Request, Response } from "express";
import { jwtService } from "../../application/jwt.service";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { userRepository } from "../../../users/repositories/users.repository";

export const refreshTokenHandler = async (req: Request, res: Response) => {
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

  const user = await userRepository.findByIdOrFail(userId);

  // создаем новую пару токенов
  const newAccessToken = await jwtService.createAccessToken(user);
  const newRefreshToken = await jwtService.createRefreshToken(user);

  //добавляем старый токен в черный список
  await jwtService.addRefreshTokenToBlackList(refreshToken);

  // обновляем куку
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
  });

  res.status(HttpStatus.Ok).json({ accessToken: newAccessToken });
  return;
};
