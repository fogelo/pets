import { Router } from "express";
import { authMiddleware } from "../auth.middleware";
import {
  codeConfirmationValidator,
  emailValidator,
  loginOrEmailValidator,
  newPasswordValidator,
  passwordValidator,
  recoveryCodeValidator,
  registrationValidation,
} from "./auth.input-dto.validation-middlewares";
import { confirmEmailHandler } from "./handlers/confirm-email.handler";
import { loginHandler } from "./handlers/login.handler";
import { registrationEmailResendingHandler } from "./handlers/registration-email-resending.handler";
import { registrationHandler } from "./handlers/registration.handler";
import { inputValidationResultMiddleware } from "../../../core/middlewares/input-validtion-result.middleware";
import { logoutHandler } from "./handlers/logout.handler";
import { refreshTokenHandler } from "./handlers/refresh.token.handler";
import { meHandler } from "./handlers/me.handler";
import { passwordRecoveryHandler } from "./handlers/password-recovery.handler";
import { newPasswordHandler } from "./handlers/new-password.handler";

export const authRouter: Router = Router({});

authRouter
  .get("/me", authMiddleware, meHandler)
  .post(
    "/login",
    loginOrEmailValidator,
    passwordValidator,
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
    codeConfirmationValidator,
    inputValidationResultMiddleware,
    confirmEmailHandler
  )
  .post(
    "/registration-email-resending",
    emailValidator,
    inputValidationResultMiddleware,
    registrationEmailResendingHandler
  )
  .post("/refresh-token", refreshTokenHandler)
  .post("/logout", logoutHandler)
  .post(
    "/password-recovery",
    emailValidator,
    inputValidationResultMiddleware,
    passwordRecoveryHandler
  )
  .post(
    "/new-password",
    recoveryCodeValidator,
    newPasswordValidator,
    inputValidationResultMiddleware,
    newPasswordHandler
  );
