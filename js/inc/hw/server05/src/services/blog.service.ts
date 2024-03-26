import { CreatePostInputModel } from "../models/input/post/create.post.input.model";
import { PostOutputModel } from "../models/output/post.output.model";
import { BlogQueryRepository } from "../repositories/blog.query.repository";
import { PostQueryRepository } from "../repositories/post.query.repository";
import { PostRepository } from "../repositories/post.repository";

export class BlogService {
  static async createPostToBlog(
    blogId: string,
    createPostModel: CreatePostInputModel
  ): Promise<PostOutputModel | null> {
    const blog = await BlogQueryRepository.getBlogById(blogId);
    if (!blog) {
      return null;
    }

    const { content, shortDescription, title } = createPostModel;
    const postData: CreatePostInputModel & { createdAt: string } = {
      title,
      content,
      shortDescription,
      blogId,
      createdAt: new Date().toISOString(),
    };

    const postId = await PostRepository.createPost(postData);
    if (!postId) {
      return null;
    }

    const post = await PostQueryRepository.getPostById(postId);
    debugger;
    if (!post) {
      return null;
    }

    return { ...post, blogName: blog.name };
  }
}
