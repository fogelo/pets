import { Injectable } from '@nestjs/common';
import { Blog, BlogModelType } from '../domain/blog.entity';
import { InjectModel } from '@nestjs/mongoose';
import { BlogsRepository } from '../infrastructure/blogs.repository';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name)
    private BlogModel: BlogModelType,
    private blogsRepository: BlogsRepository,
  ) {}
  async createBlog(dto: CreateBlogDto): Promise<string> {
    const blog = this.BlogModel.createInstance(dto);

    await this.blogsRepository.save(blog);

    return blog._id.toString();
  }
}
