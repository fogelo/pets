import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument, BlogModelType } from '../domain/blog.entity';

export class BlogsRepository {
  constructor(@InjectModel(Blog.name) private BlogModel: BlogModelType) {}
  async save(blog: BlogDocument) {
    await blog.save();
  }
}
