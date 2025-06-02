import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsEnum } from 'class-validator';

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

//базовый класс для query параметров с пагинацией
//значения по-умолчанию применятся автоматически при настройке глобального ValidationPipe в main.ts
export class BaseQueryParams {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pageNumber: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pageSize: number = 10;

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection: SortDirection = SortDirection.Desc;

  calculateSkip() {
    return (this.pageNumber - 1) * this.pageSize;
  }
}
