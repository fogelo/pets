import { Request, NextFunction, Response } from "express";
import { ValidationErrorType } from "../types/validation-error";
import { ValidationErrorListOutput } from "../types/validation-error.dto";
import {
  FieldValidationError,
  ValidationError,
  validationResult,
} from "express-validator";
import { HttpStatus } from "../types/http-statuses";

export const createErrorMessages = (
  errors: ValidationErrorType[]
): ValidationErrorListOutput => {
  return {
    errorsMessages: errors.map((error) => ({
      message: error.message, //error message
      field: error.field,
    })),
  };
};

const formatValidationError = (error: ValidationError): ValidationErrorType => {
  const expressError = error as unknown as FieldValidationError;
  return {
    field: expressError.path,
    message: expressError.msg,
  };
};

export const inputValidationResultMiddleware = (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
    .formatWith(formatValidationError)
    .array({ onlyFirstError: true });

  if (errors.length > 0) {
    res.status(HttpStatus.BadRequest).json(createErrorMessages(errors));
    return;
  }
  next();
};
