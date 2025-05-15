import { add } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { userRepository } from "../../users/repositories/users.repository";
import { User } from "../../users/types/user";
import { CreateUserInputDTO } from "../../users/types/create.user.input-dto";
import { emailAdapter } from "../../../adapters/email.adapter";
import { EmailAlreadyConfirmedError } from "../errors/email-already-confirmed.error";

export const authService = {
  async createUser({
    login,
    email,
    passwordHash,
  }: CreateUserInputDTO): Promise<string | null> {
    const user: User = {
      accountData: {
        login,
        email,
        passwordHash,
        createdAt: new Date(),
      },
      emailConfirmation: {
        confirmationCode: uuidv4(),
        expirationDate: add(new Date(), { hours: 1 }),
        isConfirmed: false,
      },
    };
    const createdUserId = await userRepository.create(user);

    try {
      await emailAdapter.sendEmailConfirmationMessage(
        user.accountData.email,
        user.emailConfirmation.confirmationCode
      );
    } catch (err) {
      console.error(err);
      return null;
    }
    return createdUserId;
  },
  async confirmEmail(code: string): Promise<boolean> {
    // пытаемся найти пользователя по email или login
    const user = await userRepository.findByCode(code);
    if (!user) {
      return false;
    }

    if (user.emailConfirmation.isConfirmed) {
      throw new EmailAlreadyConfirmedError("code");
    }
    // проверяем код подтверждения и срок жизни
    if (
      user.emailConfirmation.confirmationCode === code &&
      user.emailConfirmation.expirationDate > new Date()
    ) {
      // помечаем пользователя как подтверждённого
      await userRepository.updateIsConfirmed(user._id);
      return true;
    }

    // неверный код или срок истёк
    return false;
  },
  async _generateHashAndSalt(
    password: string
  ): Promise<{ hash: string; salt: string }> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return { hash, salt };
  },
  // ... другие методы
};
