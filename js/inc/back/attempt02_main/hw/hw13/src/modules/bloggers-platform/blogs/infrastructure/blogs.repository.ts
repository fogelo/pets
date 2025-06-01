import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument, BlogModelType } from '../domain/blog.entity';
import { Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

export class BlogsRepository {
  constructor(@InjectModel(Blog.name) private BlogModel: BlogModelType) {}
  async save(blog: BlogDocument) {
    await blog.save();
  }

  async findById(id: string): Promise<BlogDocument | null> {
    return this.BlogModel.findOne({
      _id: id,
      deletedAt: null,
    });
  }
  async findOrNotFoundFail(id: Types.ObjectId): Promise<BlogDocument> {
    const blog = await this.findById(id.toString());

    // TODO: заменить на доменную ошибку
    if (!blog) {
      throw new NotFoundException('blog not found');
    }
    return blog;
  }
}
