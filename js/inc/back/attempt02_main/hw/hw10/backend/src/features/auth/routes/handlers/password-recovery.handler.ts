import { Response } from "express";
import { emailAdapter } from "../../../../adapters/email.adapter";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { RequestWithBody } from "../../../../core/types/request-type";
import { userRepository } from "../../../users/repositories/users.repository";
import { EmailAlreadyConfirmedError } from "../../errors/email-already-confirmed.error";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { v4 as uuidv4 } from "uuid";

export const passwordRecoveryHandler = async (
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

    const recoveryCode = uuidv4();
    await userRepository.updateConfirmationCode(user._id, recoveryCode);

    emailAdapter.sendPasswordRecoveryMessage(
      user.accountData.email,
      recoveryCode
    );

    res
      .status(HttpStatus.NoContent)
      .json("Ссылка на восстановление пароля отправлена, проверьте почту");
  } catch (err) {
    errorsHandler(err, res);
  }
  return;
};
