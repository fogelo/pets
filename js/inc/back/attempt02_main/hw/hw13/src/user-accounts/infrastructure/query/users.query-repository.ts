import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserViewDto } from 'src/user-accounts/api/view-dto/users.view-dto';
import { User, UserModelType } from 'src/user-accounts/domain/user.entity';

@Injectable()
export class UsersQueryRepository {
  constructor(@InjectModel(User.name) private UserModel: UserModelType) {}
  async getById(id: string) {
    const user = await this.UserModel.findOne({ _id: id, deletedAt: null });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return UserViewDto.mapToView(user);
  }
}
