import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreatePostInputDto } from './input-dto/create-post.input-dto';
import { PostsService } from '../application/posts.service';
import { PostsQueryRepository } from '../infrastructure/query/posts.query-repository';
import { PostViewDto } from './view-dto/posts.view-dto';
import { UpdatePostInputDto } from './input-dto/update-post.input-dto';
import { Types } from 'mongoose';
import { GetPostsQueryParams } from './input-dto/get-posts-query-params.input-dto';
import { PaginatedViewDto } from 'src/core/dto/base.paginated.view-dto';

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private postsQueryRepository: PostsQueryRepository,
  ) {}
  @Get(':id')
  async getById(@Param('id') id: string): Promise<PostViewDto> {
    return this.postsQueryRepository.getById(id);
  }
  @Get()
  async getAll(
    @Query() query: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    return this.postsQueryRepository.getAll(query);
  }
  @Post()
  async createPost(@Body() dto: CreatePostInputDto): Promise<PostViewDto> {
    const postId = await this.postsService.create(dto);
    return this.postsQueryRepository.getById(postId);
  }
  @Put(':id')
  async updatePost(
    @Param('id') id: Types.ObjectId,
    @Body() body: UpdatePostInputDto,
  ): Promise<void> {
    await this.postsService.update(id, body);
    return;
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Param('id') id: Types.ObjectId) {
    await this.postsService.delete(id);
    return;
  }
}
