import { WithId } from "mongodb";
import { Post } from "../domain/post";
import { postRepository } from "../repositories/posts.repository";
import { PostQueryInput } from "../routes/input/post-query.input";
import { PostAttributes } from "./dtos/post.attributes";
import { blogRepository } from "../../blogs/repositories/blogs.repository";
import { mapToPostOutput } from "../routes/mappers/map-to-post-output";
import { PostOutput } from "../routes/output/post.output";

export const postsService = {
  async findMany(queryDto: PostQueryInput): Promise<PostOutput[]> {
    const posts = await postRepository.findMany(queryDto);
    const blogIds = [...new Set(posts.map((p) => p.blogId))];
    const blogs = await blogRepository.findMany({ ids: blogIds });
    const blogDict = Object.fromEntries(
      blogs.map((blog) => [blog._id.toString(), blog])
    );
    const postsOutput = posts.map((post) => {
      const blog = blogDict[post.blogId];
      return mapToPostOutput(post, blog);
    });
    return postsOutput;
  },
  async findByIdOrFail(id: string): Promise<WithId<Post>> {
    return postRepository.findByIdOrFail(id);
  },
  async create(dto: PostAttributes): Promise<string> {
    const newPost = {
      title: dto.title,
      shortDescription: dto.shortDescription,
      content: dto.content,
      createdAt: new Date(),
      blogId: dto.blogId,
    };
    const createdPostId = postRepository.create(newPost);
    return createdPostId;
  },
  async update(id: string, dto: PostAttributes): Promise<void> {
    await postRepository.update(id, dto);
    return;
  },
  async delete(id: string): Promise<void> {
    return postRepository.delete(id);
  },
};
