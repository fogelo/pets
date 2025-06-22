import {
  Body,
  Controller,
  Get,
  Query,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { CreateUserInputDto } from './input-dto/create-user.input-dto';
import { LoginInputDto } from './input-dto/login.input-dto';
import { PasswordRecoveryInputDto } from './input-dto/password-recovery.input-dto';
import { NewPasswordInputDto } from './input-dto/new-password.input-dto';
import { UsersService } from '../application/users.service';
import { AuthService } from '../application/auth.service';
import { LocalAuthGuard } from '../guards/local/local-auth.guard';
import { UserContextDto } from '../guards/dto/user-context.dto';

interface RequestWithUser extends ExpressRequest {
  user: UserContextDto;
}

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('/registration')
  @HttpCode(HttpStatus.NO_CONTENT)
  registration(@Body() dto: CreateUserInputDto): Promise<void> {
    return this.usersService.registerUser(dto);
  }

  // для подтверждения регистрации post запросом
  @Post('/registration-confirmation')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmEmail(@Body('code') code: string): Promise<void> {
    await this.usersService.confirmEmail(code);
  }

  // для подтверждения регистрации get запросом
  @Get('/registration-confirmation')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmEmailGet(@Query('code') code: string): Promise<void> {
    await this.usersService.confirmEmail(code);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(
    @Body() dto: LoginInputDto, //нужен здесь только для валидации входящих параметров
    @Request() req: RequestWithUser,
  ): { accessToken: string } {
    return this.authService.login(req.user.id);
  }

  @Post('/password-recovery')
  @HttpCode(HttpStatus.NO_CONTENT)
  async passwordRecovery(@Body() dto: PasswordRecoveryInputDto): Promise<void> {
    await this.usersService.initiatePasswordRecovery(dto.email);
  }

  @Post('/new-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async newPassword(@Body() dto: NewPasswordInputDto): Promise<void> {
    await this.usersService.confirmPasswordRecovery(
      dto.newPassword,
      dto.recoveryCode,
    );
  }
}
