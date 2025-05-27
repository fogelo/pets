import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModelType } from '../domain/user.entity';
import { CreateUserDto } from './create-user.dto';
import bcrypt from 'bcrypt';
import { UsersRepository } from '../infrastructure/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private UserModel: UserModelType,
    private usersRepository: UsersRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<string> {
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = this.UserModel.createInstance({
      email: dto.email,
      login: dto.login,
      passwordHash: passwordHash,
    });

    await this.usersRepository.save(user);
    return user._id.toString();
  }
}
