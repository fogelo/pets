import { NextFunction, Request, Response } from "express";
import { jwtService } from "./application/jwt.service";
import { mapToUserResponse } from "../users/routes/mappers/map-to-user-output";
import { UserResponse } from "../users/types/user.response";
import { usersService } from "../users/domain/users.service";
import { HttpStatus } from "../../core/types/http-statuses";

declare global {
  namespace Express {
    interface Request {
      user?: UserResponse;
    }
  }
}

export const authMiddleware = async (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  const token = authHeader.split(" ")[1];
  const userId = await jwtService.getUserIdByAccessToken(token);
  if (userId) {
    const user = await usersService.findByIdOrFail(userId.toString());
    if (user) {
      req.user = mapToUserResponse(user);
      next();
      return;
    }
  }

  res.sendStatus(HttpStatus.Unauthorized);
  return;
};
