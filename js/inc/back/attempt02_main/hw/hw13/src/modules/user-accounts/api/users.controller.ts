import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { UsersQueryRepository } from '../infrastructure/query/users.query-repository';
import { CreateUserInputDto } from './input-dto/create-user.input-dto';
import { UserViewDto } from './view-dto/users.view-dto';
import { GetUsersQueryParams } from './input-dto/get-users-query-params.input-dto';
import { PaginatedViewDto } from 'src/core/dto/base.paginated.view-dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private usersQueryRepository: UsersQueryRepository,
  ) {
    console.log('UsersController создан');
  }
  @Get()
  async getAllUsers(
    @Query() query: GetUsersQueryParams,
  ): Promise<PaginatedViewDto<UserViewDto[]>> {
    const users = await this.usersQueryRepository.getAll(query);
    return users;
  }
  @Post()
  async createUser(@Body() dto: CreateUserInputDto): Promise<UserViewDto> {
    const userId = await this.usersService.create(dto);
    return this.usersQueryRepository.getById(userId);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(id);
  }
  //   @Put()
  //   async updateUser(@Body() dto: UpdateUserInputDto): Promise<UserViewDto> {
  //     const userId = await this.usersService.create(dto);
  //     return this.usersQueryRepository.getById(userId);
  //   }
}
