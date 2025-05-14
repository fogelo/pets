import { Router } from "express";
import { authMiddleware } from "../auth.middleware";
import {
  emailValidator,
  loginValidation,
  registrationValidation,
} from "./auth.input-dto.validation-middlewares";
import { confirmEmailHandler } from "./handlers/confirm-email.handler";
import { loginHandler } from "./handlers/login.handler";
import { registrationEmailResendingHandler } from "./handlers/registration-email-resending.handler";
import { registrationHandler } from "./handlers/registration.handler";
import { inputValidationResultMiddleware } from "../../../core/middlewares/input-validtion-result.middleware";

export const authRouter: Router = Router({});

authRouter
  .get("/me", authMiddleware)
  .post(
    "/login",
    loginValidation(),
    inputValidationResultMiddleware,
    loginHandler
  )
  .post(
    "/registration",
    registrationValidation(),
    inputValidationResultMiddleware,
    registrationHandler
  )
  .post(
    "/registration-confirmation",
    confirmEmailHandler
  )
  .post(
    "/registration-email-resending",
    emailValidator,
    inputValidationResultMiddleware,
    registrationEmailResendingHandler
  );
