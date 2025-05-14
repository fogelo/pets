import { Response } from "express";
import { emailAdapter } from "../../../../adapters/email.adapter";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { RequestWithBody } from "../../../../core/types/request-type";
import { userRepository } from "../../../users/repositories/users.repository";

export const registrationEmailResendingHandler = async (
  req: RequestWithBody<{ email: string }>,
  res: Response
) => {
  const email = req.body.email;
  const user = await userRepository.findByEmail(email);
  if (!user) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }

  try {
    await emailAdapter.sendEmailConfirmationMessage(
      email,
      user.emailConfirmation.confirmationCode
    );
    res
      .status(HttpStatus.NoContent)
      .json("Ссылка на подтверждение отправлена,проверьте почту");
  } catch (err) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
  return;
};
