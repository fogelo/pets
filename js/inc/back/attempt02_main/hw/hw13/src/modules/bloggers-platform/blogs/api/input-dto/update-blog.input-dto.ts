import { IsString, Length, Matches } from 'class-validator';
import {
  descriptionConstraints,
  nameConstraints,
  websiteUrlConstraints,
} from '../../domain/blog.entity';

export class UpdateBlogInputDto {
  @IsString()
  @Length(nameConstraints.minLength, nameConstraints.maxLength)
  name: string;

  @IsString()
  @Length(descriptionConstraints.minLength, descriptionConstraints.maxLength)
  description: string;

  @IsString()
  @Length(websiteUrlConstraints.minLength, websiteUrlConstraints.maxLength)
  @Matches(websiteUrlConstraints.match)
  websiteUrl: string;
}
