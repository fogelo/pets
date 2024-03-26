import { NextFunction, Request, Response } from "express";
import { validationResult, ValidationError } from "express-validator";
import { IError, Status } from "../models/common";

export const inputValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  const errorsMessages = result
    .array({ onlyFirstError: true })
    .map((error: ValidationError) => ({
      message: error.msg,
      field: error.type === "field" ? error.path : "unknown",
    }));

  const error: IError = {
    errorsMessages,
  };

  res.status(Status.BadRequest_400).json(error);
};
