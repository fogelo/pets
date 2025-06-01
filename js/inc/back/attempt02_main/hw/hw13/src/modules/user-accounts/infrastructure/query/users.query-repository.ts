import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery } from 'mongoose';
import { PaginatedViewDto } from 'src/core/dto/base.paginated.view-dto';
import { GetUsersQueryParams } from 'src/modules/user-accounts/api/input-dto/get-users-query-params.input-dto';
import { UserViewDto } from 'src/modules/user-accounts/api/view-dto/users.view-dto';
import { User, UserModelType } from '../../domain/user.entity';

@Injectable()
export class UsersQueryRepository {
  constructor(@InjectModel(User.name) private UserModel: UserModelType) {}
  async getAll(
    query: GetUsersQueryParams,
  ): Promise<PaginatedViewDto<UserViewDto[]>> {
    const filter: FilterQuery<User> = {
      deletedAt: null,
    };

    if (query.searchLoginTerm) {
      filter.$or = filter.$or || [];
      filter.$or.push({
        login: { $regex: query.searchLoginTerm, $options: 'i' },
      });
    }
    if (query.searchEmailTerm) {
      filter.$or = filter.$or || [];
      filter.$or.push({
        login: { $regex: query.searchEmailTerm, $options: 'i' },
      });
    }

    const users = await this.UserModel.find(filter)
      .sort({
        [query.sortBy]: query.sortDirection,
      })
      .skip(query.calculateSkip())
      .limit(query.pageSize);

    const totalCount = await this.UserModel.countDocuments(filter);
    const items = users.map((user) => UserViewDto.mapToView(user));

    return PaginatedViewDto.mapToView<UserViewDto[]>({
      items,
      page: query.pageNumber,
      pagesCount: Math.ceil(totalCount / query.pageSize),
      pageSize: query.pageSize,
      totalCount,
    });
  }
  async getById(id: string) {
    const user = await this.UserModel.findOne({ _id: id, deletedAt: null });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return UserViewDto.mapToView(user);
  }
}
