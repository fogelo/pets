import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserInputDto } from './input-dto/users.input-dto';
import { UsersService } from '../application/users.service';
import { UserViewDto } from './view-dto/users.view-dto';
import { UsersQueryRepository } from '../infrastructure/query/users.query-repository';

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
}
