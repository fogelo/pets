import { IsEmail, IsString } from 'class-validator';
import { Trim } from 'src/core/decorators/transform/trim';

export class RegistrationEmailResendingInputDto {
  @IsString()
  @IsEmail()
  @Trim()
  email: string;
}
