import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { PostModelType } from '../domain/post.entity';
import { PostsRepository } from '../infrastructure/posts.repository';
import { UpdatePostDto } from './dto/update-post.dto';
import { Types } from 'mongoose';

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
  async update(id: Types.ObjectId, dto: UpdatePostDto) {
    const post = await this.postsRepository.findOrNotFoundFail(id);
    post.update(dto);
    await this.postsRepository.save(post);
    return post._id.toString();
  }
  async delete(id: Types.ObjectId): Promise<void> {
    const post = await this.postsRepository.findOrNotFoundFail(id);
    post.makeDeleted();
    await this.postsRepository.save(post);
  }
}
