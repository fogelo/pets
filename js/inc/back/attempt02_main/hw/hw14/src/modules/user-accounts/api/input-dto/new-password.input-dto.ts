import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class NewPasswordInputDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  @Transform(({ value }: { value: string }) => value?.trim())
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  recoveryCode: string;
}
