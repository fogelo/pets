import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { UsersQueryRepository } from '../infrastructure/query/users.query-repository';
import { CreateUserInputDto } from './input-dto/create-user.input-dto';
import { UserViewDto } from './view-dto/users.view-dto';

@Controller('hometask_13/api/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private usersQueryRepository: UsersQueryRepository,
  ) {
    console.log('UsersController создан');
  }
  @Post()
  async createUser(@Body() dto: CreateUserInputDto): Promise<UserViewDto> {
    const userId = await this.usersService.create(dto);
    return this.usersQueryRepository.getById(userId);
  }
  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<void> {
    return this.usersService.delete(userId);
  }
  //   @Put()
  //   async updateUser(@Body() dto: UpdateUserInputDto): Promise<UserViewDto> {
  //     const userId = await this.usersService.create(dto);
  //     return this.usersQueryRepository.getById(userId);
  //   }
}
