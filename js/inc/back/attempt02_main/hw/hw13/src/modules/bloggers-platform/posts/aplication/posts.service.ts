import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { PostModelType } from '../domain/post.entity';
import { PostsRepository } from '../infrastructure/posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private PostModel: PostModelType,
    private postsRepository: PostsRepository,
  ) {}
  async create(dto: CreatePostDto) {
    const post = this.PostModel.createInstance(dto);
    await this.postsRepository.save(post);
    return post._id.toString();
  }
}
