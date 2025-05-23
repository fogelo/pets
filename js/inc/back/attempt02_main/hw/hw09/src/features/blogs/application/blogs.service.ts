import { WithId } from "mongodb";
import { Blog } from "../domain/blog";
import { blogRepository } from "../repositories/blogs.repository";
import { BlogQueryInput } from "../routes/input/blog-query.input";
import { BlogAttributes } from "./dtos/blog.attributes";

export const blogsService = {
  async findMany(
    queryDto: BlogQueryInput
  ): Promise<{ items: WithId<Blog>[]; totalCount: number }> {
    const result = blogRepository.findMany(queryDto);
    return result;
  },
  async findByIdOrFail(id: string): Promise<WithId<Blog>> {
    return blogRepository.findByIdOrFail(id);
  },
  async findByIdsOrFail(ids: string[]): Promise<WithId<Blog>[]> {
    return blogRepository.findByIdsOrFail(ids);
  },
  async create(dto: BlogAttributes): Promise<string> {
    const newBlog = {
      name: dto.name,
      description: dto.description,
      websiteUrl: dto.websiteUrl,
      createdAt: new Date(),
    };
    const createdBlogId = blogRepository.create(newBlog);
    return createdBlogId;
  },
  async update(id: string, dto: BlogAttributes): Promise<void> {
    await blogRepository.update(id, dto);
    return;
  },
  async delete(id: string): Promise<void> {
    return blogRepository.delete(id);
  },
};
