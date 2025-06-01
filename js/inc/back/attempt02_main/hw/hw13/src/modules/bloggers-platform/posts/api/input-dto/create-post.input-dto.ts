import { IsString, Length } from 'class-validator';
import { Trim } from 'src/core/decorators/transform/trim';

export class CreatePostInputDto {
  @IsString()
  @Length(0, 30)
  @Trim()
  title: string;

  @IsString()
  @Length(0, 100)
  @Trim()
  shortDescription: string;

  @IsString()
  @Length(0, 1000)
  @Trim()
  content: string;

  @IsString()
  blogId: string;
}
