import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument, PostModelType } from '../domain/post.entity';
import { Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

export class PostsRepository {
  constructor(@InjectModel(Post.name) private PostModel: PostModelType) {}
  async save(post: PostDocument) {
    await post.save();
  }
  async findById(id: string): Promise<PostDocument | null> {
    const post = this.PostModel.findOne({ _id: id, deletedAt: null });
    return post;
  }
  async findOrNotFoundFail(id: Types.ObjectId): Promise<PostDocument> {
    const post = await this.findById(id.toString());
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }
}
