import { Request, Response } from "express";
import { authService } from "../../application/auth.service";
import { HttpStatus } from "../../../../core/types/http-statuses";

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
      res.sendStatus(HttpStatus.Created);
    } else {
      res.sendStatus(HttpStatus.BadRequest);
    }
  } catch (err) {
    console.error("Ошибка подтверждения email:", err);
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
