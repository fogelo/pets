import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog, BlogModelType } from '../domain/blog.entity';
import { InjectModel } from '@nestjs/mongoose';
import { BlogViewDto } from '../api/view-dto/users.view-dto';

@Injectable()
export class BlogsQueryRepository {
  constructor(@InjectModel(Blog.name) private BlogModel: BlogModelType) {}
  async getById(id: string): Promise<BlogViewDto> {
    const blog = await this.BlogModel.findOne({
      _id: id,
      // deletedAt: null,
    });
    if (!blog) {
      throw new NotFoundException('user not found');
    }
    return BlogViewDto.mapToView(blog);
  }
}
