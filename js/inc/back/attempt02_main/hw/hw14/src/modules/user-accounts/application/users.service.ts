import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModelType } from '../domain/user.entity';
import { CreateUserDto } from './create-user.dto';
import bcrypt from 'bcrypt';
import { UsersRepository } from '../infrastructure/users.repository';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from 'src/modules/notifications/email.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private UserModel: UserModelType,
    private usersRepository: UsersRepository,
    private emailService: EmailService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<string> {
    // Проверяем, существует ли пользователь с таким login
    const existingUserByLogin = await this.usersRepository.findByLogin(
      dto.login,
    );
    if (existingUserByLogin) {
      throw new BadRequestException([
        {
          message: 'User with this login already exists',
          field: 'login',
        },
      ]);
    }

    // Проверяем, существует ли пользователь с таким email
    const existingUserByEmail = await this.usersRepository.findByEmail(
      dto.email,
    );
    if (existingUserByEmail) {
      throw new BadRequestException([
        {
          message: 'User with this email already exists',
          field: 'email',
        },
      ]);
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = this.UserModel.createInstance({
      email: dto.email,
      login: dto.login,
      passwordHash: passwordHash,
    });

    // Пользователи, созданные через административный эндпоинт, автоматически имеют подтвержденный email
    user.isEmailConfirmed = true;

    await this.usersRepository.save(user);
    return user._id.toString();
  }
  async deleteUser(id: string) {
    const user = await this.usersRepository.findOrNotFoundFail(id);
    user.makeDeleted();
    await this.usersRepository.save(user);
  }
  async registerUser(dto: CreateUserDto): Promise<any> {
    // Проверяем, существует ли пользователь с таким login
    const existingUserByLogin = await this.usersRepository.findByLogin(
      dto.login,
    );
    if (existingUserByLogin) {
      throw new BadRequestException([
        {
          message: 'User with this login already exists',
          field: 'login',
        },
      ]);
    }

    // Проверяем, существует ли пользователь с таким email
    const existingUserByEmail = await this.usersRepository.findByEmail(
      dto.email,
    );
    if (existingUserByEmail) {
      throw new BadRequestException([
        {
          message: 'User with this email already exists',
          field: 'email',
        },
      ]);
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = this.UserModel.createInstance({
      email: dto.email,
      login: dto.login,
      passwordHash: passwordHash,
    });

    const confirmationCode = uuidv4();
    user.setConfirmationCode(confirmationCode);
    await this.usersRepository.save(user);

    await this.emailService.sendEmailConfirmationMessage(
      dto.email,
      confirmationCode,
    );
    return user.toObject();
  }
  async confirmEmail(code: string): Promise<void> {
    const user = await this.usersRepository.findByConfirmationCode(code);
    if (!user) {
      throw new BadRequestException([
        {
          message: 'Invalid confirmation code',
          field: 'code',
        },
      ]);
    }

    // Проверяем, что email еще не подтвержден
    if (user.isEmailConfirmed) {
      throw new BadRequestException([
        {
          message: 'Email is already confirmed',
          field: 'code',
        },
      ]);
    }

    user.isEmailConfirmed = true;
    user.confirmationCode = null;
    await this.usersRepository.save(user);
  }

  async resendRegistrationEmail(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException([
        {
          message: 'User with this email does not exist',
          field: 'email',
        },
      ]);
    }

    if (user.isEmailConfirmed) {
      throw new BadRequestException([
        {
          message: 'Email is already confirmed',
          field: 'email',
        },
      ]);
    }

    // Генерируем новый код подтверждения
    const newConfirmationCode = uuidv4();
    user.setConfirmationCode(newConfirmationCode);
    await this.usersRepository.save(user);

    console.log('отправил код', newConfirmationCode);

    // Отправляем email с новым кодом
    await this.emailService.sendEmailConfirmationMessage(
      email,
      newConfirmationCode,
    );
  }

  async initiatePasswordRecovery(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      // Для безопасности не сообщаем, что пользователь не найден
      return;
    }

    const recoveryCode = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // код действует 24 часа

    user.setPasswordRecoveryCode(recoveryCode, expiresAt);
    await this.usersRepository.save(user);

    // Отправляем email с кодом восстановления
    // await this.emailService.sendPasswordRecoveryMessage(email, recoveryCode);
  }

  async confirmPasswordRecovery(
    newPassword: string,
    recoveryCode: string,
  ): Promise<void> {
    const user =
      await this.usersRepository.findByPasswordRecoveryCode(recoveryCode);

    if (!user || !user.isPasswordRecoveryCodeValid(recoveryCode)) {
      throw new BadRequestException([
        {
          message: 'Invalid or expired recovery code',
          field: 'recoveryCode',
        },
      ]);
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    user.updatePassword(newPasswordHash);
    await this.usersRepository.save(user);
  }
}
