import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { CreateBlogDomainDto } from './create-blog.domain.dto';
import { UpdateBlogDto } from '../application/dto/update-blog.dto';
import { NotFoundException } from '@nestjs/common';

export const nameConstraints = {
  minLength: 1,
  maxLength: 15,
};

export const descriptionConstraints = {
  minLength: 0,
  maxLength: 500,
};

export const websiteUrlConstraints = {
  minLength: 0,
  maxLength: 100,
  match: /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/,
};

@Schema({ timestamps: true, collection: 'blogs' })
export class Blog {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  websiteUrl: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;

  static createInstance(dto: CreateBlogDomainDto): BlogDocument {
    const blog = new this();
    blog.name = dto.name;
    blog.description = dto.description;
    blog.websiteUrl = dto.description;
    return blog as BlogDocument;
  }
  update(dto: UpdateBlogDto) {
    this.name = dto.name;
    this.description = dto.description;
    this.websiteUrl = dto.websiteUrl;
  }
  makeDeleted() {
    if (this.deletedAt !== null) {
      throw new NotFoundException();
    }
    this.deletedAt = new Date();
  }
}

// это схема, которая нужна монгусу,чтобы создаеть модель
export const BlogSchema = SchemaFactory.createForClass(Blog);

// В Mongoose/NestJS методы в теле класса-схемы — это не автоматически методы модели.
// Нужно их дополнительно зарегестрировать
// регистрирует методы сущности в схеме
BlogSchema.loadClass(Blog);

// Типизация документа
// HydratedDocument означает,что Blog теперь не просто plain-JS объект, а уже «гидрированный»
// Mongoose-документ с методами и метаданными.
export type BlogDocument = HydratedDocument<Blog>;

// Типизация модели + статические методы
export type BlogModelType = Model<BlogDocument> & typeof Blog;
