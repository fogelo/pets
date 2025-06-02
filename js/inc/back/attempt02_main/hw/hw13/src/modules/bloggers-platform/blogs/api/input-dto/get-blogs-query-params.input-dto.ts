import { BaseQueryParams } from 'src/core/dto/base.query-params.input-dto';
import { BlogsSortBy } from './blogs-sort-by';
import { IsOptional, IsString, IsEnum } from 'class-validator';

export class GetBlogsQueryParams extends BaseQueryParams {
  // @IsOptional()
  // @IsString()
  searchNameTerm: string | null = null;

  // @IsOptional()
  // @IsEnum(BlogsSortBy)
  sortBy = BlogsSortBy.CreatedAt;
}
