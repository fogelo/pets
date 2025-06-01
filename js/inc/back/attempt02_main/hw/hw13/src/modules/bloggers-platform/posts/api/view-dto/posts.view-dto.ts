import { BlogDocument } from 'src/modules/bloggers-platform/blogs/domain/blog.entity';
import { PostDocument } from '../../domain/post.entity';

export class PostViewDto {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: Date;
  extendedLikesInfo: {
    likesCount: number;
    dislikesCount: number;
    myStatus: string;
    newestLikes: Array<{
      addedAt: Date;
      userId: string;
      login: string;
    }>;
  };

  static mapToView(post: PostDocument, blog: BlogDocument): PostViewDto {
    const dto = new PostViewDto();

    dto.id = post._id.toString();
    dto.title = post.title;
    dto.content = post.content;
    dto.shortDescription = post.shortDescription;
    dto.blogId = post.blogId;
    dto.blogName = blog.name;
    dto.createdAt = post.createdAt;
    dto.extendedLikesInfo = {
      likesCount: 0,
      dislikesCount: 0,
      myStatus: 'None',
      newestLikes: [
        {
          addedAt: new Date('2025-06-01T10:55:30.014Z'),
          login: 'login',
          userId: 'string',
        },
      ],
    };
    return dto;
  }
}
