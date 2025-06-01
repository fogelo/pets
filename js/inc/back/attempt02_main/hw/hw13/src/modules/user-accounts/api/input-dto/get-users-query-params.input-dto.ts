import { BaseQueryParams } from 'src/core/dto/base.query-params.input-dto';
import { UsersSortBy } from './users-sort-by';

export class GetUsersQueryParams extends BaseQueryParams {
  searchLoginTerm: string | null = null;
  searchEmailTerm: string | null = null;
  sortBy: UsersSortBy = UsersSortBy.CreatedAt;
}
