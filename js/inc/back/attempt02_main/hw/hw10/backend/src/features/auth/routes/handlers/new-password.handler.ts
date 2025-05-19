import { Request, Response } from "express";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { authService } from "../../application/auth.service";

// DTO для тела запроса
interface NewPasswordDto {
  newPassword: string;
  recoveryCode: string;
}

// Вынесенный именованный хендлер
export async function newPasswordHandler(
  req: Request<{}, {}, NewPasswordDto>,
  res: Response
): Promise<void> {
  try {
    const { recoveryCode, newPassword } = req.body;
    const { hash } = await authService._generateHashAndSalt(newPassword);
    const result = await authService.newPassword(recoveryCode, hash);

    if (result) {
      res.sendStatus(HttpStatus.NoContent);
    } else {
      res.status(HttpStatus.BadRequest).json({
        errorsMessages: [{ message: "Invalid or expired recoveryCode", field: "recoveryCode" }],
      });
      return;
    }
  } catch (err) {
    errorsHandler(err, res);
  }
}
