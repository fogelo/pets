import { NextFunction, Request, Response } from "express";
import { jwtService } from "./application/jwt.service";
import { mapToUserResponse } from "../users/routes/mappers/map-to-user-output";
import { UserResponse } from "../users/types/user.response";
import { usersService } from "../users/domain/users.service";
import { HttpStatus } from "../../core/types/http-statuses";
import { devicesService } from "./application/devices.service";
import { requestLogsCollection } from "../../db/db";

declare global {
  namespace Express {
    interface Request {
      user?: UserResponse;
    }
  }
}

export const ddosGuardMiddleware = async (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // const totalCount = await requestLogsCollection.countDocuments(filter);
  
  next();
  return;
};
