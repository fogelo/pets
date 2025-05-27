import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BlogsQueryRepository } from '../infrastructure/blogs.query-repository';
import { BlogsService } from '../application/blogs.service';
import { CreateBlogInputDto } from './input-dto/blogs.input-dto';
import { BlogViewDto } from './view-dto/users.view-dto';

@Controller('hometask_13/api/blogs')
export class BlogsController {
  constructor(
    private blogsQueryRepository: BlogsQueryRepository,
    private blogsService: BlogsService,
  ) {}
  @Get()
  getBlogList() {
    return [];
  }
  @Get(':id')
  getBlogById(@Param('id') blogId: string) {
    return this.blogsQueryRepository.getById(blogId);
  }
  @Post()
  async createBlog(@Body() body: CreateBlogInputDto): Promise<BlogViewDto> {
    const blogId = await this.blogsService.createBlog(body);
    return this.blogsQueryRepository.getById(blogId);
  }
  updateBlog() {}
  deleteBlog() {}
}
