import { Response } from "express";
import { emailAdapter } from "../../../../adapters/email.adapter";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { RequestWithBody } from "../../../../core/types/request-type";
import { userRepository } from "../../../users/repositories/users.repository";
import { EmailAlreadyConfirmedError } from "../../errors/email-already-confirmed.error";
import { errorsHandler } from "../../../../core/errors/errors.handler";

export const registrationEmailResendingHandler = async (
  req: RequestWithBody<{ email: string }>,
  res: Response
) => {
  const email = req.body.email;
  const user = await userRepository.findByEmail(email);

  if (!user) {
    res.status(HttpStatus.BadRequest).json({
      errorsMessages: [
        { message: "User with this email doesn’t exist", field: "email" },
      ],
    });
    return;
  }

  try {
    if (user.emailConfirmation.isConfirmed) {
      throw new EmailAlreadyConfirmedError("email");
    }

    await emailAdapter.sendEmailConfirmationMessage(
      user.accountData.email,
      user.emailConfirmation.confirmationCode
    );
    res
      .status(HttpStatus.NoContent)
      .json("Ссылка на подтверждение отправлена, проверьте почту");
  } catch (err) {
    errorsHandler(err, res);
  }
  return;
};
