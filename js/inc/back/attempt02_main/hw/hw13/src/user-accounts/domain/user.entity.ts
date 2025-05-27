import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUserDomainDto } from './dto/create-user.domain.dto';
import { HydratedDocument, Model } from 'mongoose';

@Schema()
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
  email: string;

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
  createdAt: Date;
  updatedAt: Date;

  /**
   * фабричный метод
   */
  static createInstance(dto: CreateUserDomainDto): UserDocument {
    const user = new this();
    user.login = dto.login;
    user.email = dto.email;
    user.passwordHash = dto.passwordHash;

    return user as UserDocument;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

//регистрирует методы сущности в схеме
UserSchema.loadClass(User);

//Типизация документа
export type UserDocument = HydratedDocument<User>;

//Типизация модели + статические методы
export type UserModelType = Model<UserDocument> & typeof User;
