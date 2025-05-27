import { UserDocument } from '../domain/user.entity';

export class UsersRepository {
  //   constructor(@InjectModel(User.name) private UserModel: UserModelType) {}
  async save(user: UserDocument) {
    await user.save();
  }
}
