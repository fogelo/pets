import { NextFunction, Request, Response } from "express";
import { usersService } from "../users/application/users.service";
import { jwtService } from "./application/jwt.service";
import { mapToUserOutput } from "../users/routes/mappers/map-to-user-output";
import { UserOutput } from "../users/routes/output/user.output";

declare global {
  namespace Express {
    interface Request {
      user?: UserOutput;
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
    res.sendStatus(401);
    return;
  }

  const token = authHeader.split(" ")[1];
  const userId = await jwtService.getUserIdByToken(token);
  if (userId) {
    const user = await usersService.findByIdOrFail(userId.toString());
    if (user) {
      req.user = mapToUserOutput(user);
      next();
      return;
    }
  }

  res.sendStatus(401);
  return;
};
