import { NotFoundException } from '@nestjs/common';
import { CreatePostDomainDto } from './dto/create-post.domain-dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { UpdatePostDomainDto } from './dto/update-post.domain-dto';

@Schema({ timestamps: true, collection: 'posts' })
export class Post {
  @Prop()
  title: string;

  @Prop()
  shortDescription: string;

  @Prop()
  content: string;

  @Prop()
  blogId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;

  static createInstance(dto: CreatePostDomainDto): PostDocument {
    const post = new this();
    post.title = dto.title;
    post.content = dto.content;
    post.shortDescription = dto.shortDescription;
    post.blogId = dto.blogId;

    return post as PostDocument;
  }

  makeDeleted() {
    if (this.deletedAt !== null) {
      // Вместо обычной ошибки выбрасываем NotFoundException
      throw new NotFoundException('post not found');
    }
    this.deletedAt = new Date();
  }
  update(dto: UpdatePostDomainDto) {
    this.title = dto.title;
    this.content = dto.content;
    this.shortDescription = dto.shortDescription;
    this.blogId = dto.blogId;
  }
}
export const PostSchema = SchemaFactory.createForClass(Post);

//регистрирует методы сущности в схеме
PostSchema.loadClass(Post);

//Типизация документа
export type PostDocument = HydratedDocument<Post>;

//Типизация модели + статические методы
export type PostModelType = Model<PostDocument> & typeof Post;
