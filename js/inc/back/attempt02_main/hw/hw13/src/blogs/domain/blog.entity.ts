import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { CreateBlogDomainDto } from './create-blog.domain.dto';

@Schema({ timestamps: true })
export class Blog {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  websiteUrl: string;

  createdAt: Date;
  updatedAt: Date;

  static createInstance(dto: CreateBlogDomainDto): BlogDocument {
    const blog = new this();
    blog.name = dto.name;
    blog.description = dto.description;
    blog.websiteUrl = dto.description;
    return blog as BlogDocument;
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
