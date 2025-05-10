import { WithId } from "mongodb";
import { Post } from "../domain/post";
import { postRepository } from "../repositories/posts.repository";
import { PostQueryInput } from "../routes/input/post-query.input";
import { PostAttributes } from "./dtos/post.attributes";

export const postsService = {
  async findMany(
    dto: PostQueryInput & { blogId?: string }
  ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
    const result = postRepository.findMany(dto);
    return result;
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
