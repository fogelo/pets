import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUserDomainDto } from './dto/create-user.domain.dto';
import { HydratedDocument, Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

export const loginConstraints = {
  minLength: 3,
  maxLength: 10,
  match: /^[a-zA-Z0-9_-]*$/,
};

export const passwordConstraints = {
  minLength: 6,
  maxLength: 20,
};

export const emailConstraints = {
  match: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
};

@Schema({ timestamps: true })
export class User {
  /**
   * логин пользователя (должен быть уникальным)
   * @type {string}
   * @required
   */
  @Prop({ type: String, required: true, unique: true })
  login: string;

  /**
   * email пользователя (должна быть уникальной)
   * @type {string}
   * @required
   */
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: Boolean, required: true, default: false })
  isEmailConfirmed: boolean;

  @Prop({ type: String, default: null })
  confirmationCode: string | null;

  @Prop({ type: String, default: null })
  passwordRecoveryCode: string | null;

  @Prop({ type: Date, default: null })
  passwordRecoveryCodeExpiresAt: Date | null;

  /**
   * хеш пароля для аутонтефикации
   * @type {string}
   * @required
   */
  @Prop({ type: String, unique: true, required: true })
  passwordHash: string;

  /**
   * @type {Date}
   */
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;

  /**
   * фабричный метод
   */
  static createInstance(dto: CreateUserDomainDto): UserDocument {
    const user = new this();
    user.login = dto.login;
    user.email = dto.email;
    user.passwordHash = dto.passwordHash;
    user.isEmailConfirmed = false; // пользователь ВСЕГДА должен после регистрации подтверждить свой Email

    return user as UserDocument;
  }

  makeDeleted() {
    if (this.deletedAt !== null) {
      // Вместо обычной ошибки выбрасываем NotFoundException
      throw new NotFoundException('user not found');
    }
    this.deletedAt = new Date();
  }
  setConfirmationCode(confirmationCode: string | null) {
    this.confirmationCode = confirmationCode;
  }

  setPasswordRecoveryCode(recoveryCode: string, expiresAt: Date) {
    this.passwordRecoveryCode = recoveryCode;
    this.passwordRecoveryCodeExpiresAt = expiresAt;
  }

  updatePassword(newPasswordHash: string) {
    this.passwordHash = newPasswordHash;
    this.passwordRecoveryCode = null;
    this.passwordRecoveryCodeExpiresAt = null;
  }

  isPasswordRecoveryCodeValid(code: string): boolean {
    if (!this.passwordRecoveryCode || !this.passwordRecoveryCodeExpiresAt) {
      return false;
    }

    if (this.passwordRecoveryCodeExpiresAt < new Date()) {
      return false; // код истек
    }

    return this.passwordRecoveryCode === code;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

//регистрирует методы сущности в схеме
UserSchema.loadClass(User);

//Типизация документа
export type UserDocument = HydratedDocument<User>;

//Типизация модели + статические методы
export type UserModelType = Model<UserDocument> & typeof User;
