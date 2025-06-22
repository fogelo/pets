import { IsString, Length } from 'class-validator';
import { Trim } from 'src/core/decorators/transform/trim';
import { passwordConstraints } from 'src/modules/user-accounts/domain/user.entity';

export class LoginInputDto {
  @IsString()
  @Trim()
  loginOrEmail: string;

  @IsString()
  @Length(passwordConstraints.minLength, passwordConstraints.maxLength)
  @Trim()
  password: string;
}
