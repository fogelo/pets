import { ValidationErrorType } from "../types/validation-error";
import { ValidationErrorListOutput } from "../types/validation-error.dto";

export const createErrorMessages = (
    errors: ValidationErrorType[],
  ): ValidationErrorListOutput => {
    return {
      errors: errors.map((error) => ({
        status: error.status,
        detail: error.detail, //error message
        source: { pointer: error.source ?? '' }, //error field
        code: error.code ?? null, //domain error code
      })),
    };
  };