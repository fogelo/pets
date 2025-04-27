import { validationResult } from "express-validator";
import { HTTP_STATUSES } from "../utils";
import { Request, Response, NextFunction } from "express";

export const inputValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    next();
  } else {
    res.status(HTTP_STATUSES.BAD_REQUEST_400);
    res.json(result.array());
  }
};
