import { IsEmail, IsString, Length } from 'class-validator';
import { Trim } from 'src/core/decorators/transform/trim';
import { IsStringWithTrim } from 'src/core/decorators/validation/is-string-with-trim';
import {
  loginConstraints,
  passwordConstraints,
} from 'src/modules/user-accounts/domain/user.entity';

//dto для боди при создании юзера. Сюда могут быть добавлены декораторы swagger
export class CreateUserInputDto {
  @IsStringWithTrim(loginConstraints.minLength, loginConstraints.maxLength)
  login: string;

  @IsString()
  @Length(passwordConstraints.minLength, passwordConstraints.maxLength)
  @Trim()
  password: string;

  @IsString()
  @IsEmail()
  // @Matches(emailConstraints.match)
  @Trim() //удаляет пробелы и передает дальше
  email: string;
}
