import { InjectModel } from '@nestjs/mongoose';
import { Post, PostModelType } from '../../domain/post.entity';
import { NotFoundException } from '@nestjs/common';
import {
  Blog,
  BlogModelType,
} from 'src/modules/bloggers-platform/blogs/domain/blog.entity';
import { PostViewDto } from '../../api/view-dto/posts.view-dto';

export class PostsQueryRepository {
  constructor(
    @InjectModel(Post.name) private PostModel: PostModelType,
    @InjectModel(Blog.name) private BlogModel: BlogModelType,
  ) {}
  async getById(id: string) {
    const post = await this.PostModel.findOne({ _id: id, deletedAt: null });
    if (!post) {
      throw new NotFoundException('post not found');
    }

    const blog = await this.BlogModel.findOne({
      _id: post.blogId,
      deletedAt: null,
    });
    if (!blog) {
      throw new NotFoundException('blog not found');
    }

    return PostViewDto.mapToView(post, blog);
  }
}
