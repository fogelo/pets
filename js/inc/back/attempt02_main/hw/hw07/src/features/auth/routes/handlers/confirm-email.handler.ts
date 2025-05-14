import { Request, Response } from "express";
import { authService } from "../../application/auth.service";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { usersService } from "../../../users/domain/users.service";
import { errorsHandler } from "../../../../core/errors/errors.handler";

// DTO для тела запроса
interface ConfirmEmailDto {
  code: string;
}

// Вынесенный именованный хендлер
export async function confirmEmailHandler(
  req: Request<{}, {}, ConfirmEmailDto>,
  res: Response
): Promise<void> {
  try {
    const { code } = req.body;
    const result = await authService.confirmEmail(code);

    if (result) {
      res.sendStatus(HttpStatus.NoContent);
    } else {
      res.sendStatus(HttpStatus.BadRequest);
    }
  } catch (err) {
    errorsHandler(err, res);
  }
}
