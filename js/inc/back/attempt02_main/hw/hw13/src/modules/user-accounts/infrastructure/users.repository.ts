import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserModelType } from '../domain/user.entity';
import { NotFoundException } from '@nestjs/common';

export class UsersRepository {
  constructor(@InjectModel(User.name) private UserModel: UserModelType) {}
  async findById(id: string): Promise<UserDocument | null> {
    const aaa = await this.UserModel.findOne({
      _id: id,
      deletedAt: null,
    });
    return aaa;
  }
  async findOrNotFoundFail(id: string): Promise<UserDocument> {
    const user = await this.findById(id);

    if (!user) {
      //TODO: replace with domain exception
      throw new NotFoundException('user not found');
    }

    return user;
  }
  async save(user: UserDocument) {
    await user.save();
  }
}
