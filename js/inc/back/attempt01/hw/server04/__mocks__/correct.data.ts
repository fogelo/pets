import { Pagination } from "../src/models/common";
import { BlogOutputModel } from "../src/models/output/blog.output.model";
import { PostOutputModel } from "../src/models/output/post.output.model";

export const getCorrectOutputBlogItem = (): BlogOutputModel => {
  return {
    id: expect.any(String),
    name: expect.any(String),
    description: expect.any(String),
    websiteUrl: expect.any(String),
    createdAt: expect.any(String),
    isMembership: expect.any(Boolean),
  };
};
export const getCorrectOutputBlogsBody = (): Pagination<BlogOutputModel> => {
  return {
    pagesCount: expect.any(Number),
    page: expect.any(Number),
    pageSize: expect.any(Number),
    totalCount: expect.any(Number),
    items: expect.arrayContaining([
      expect.objectContaining(getCorrectOutputBlogItem()),
    ]),
  };
};
export const getCorrectOutputPostItem = (): PostOutputModel => {
  return {
    id: expect.any(String),
    title: expect.any(String),
    shortDescription: expect.any(String),
    content: expect.any(String),
    createdAt: expect.any(String),
    blogId: expect.any(String),
    blogName: expect.any(String),
  };
};
export const getCorrectOutputPostsBody = (): Pagination<PostOutputModel> => {
  return {
    pagesCount: expect.any(Number),
    page: expect.any(Number),
    pageSize: expect.any(Number),
    totalCount: expect.any(Number),
    items: expect.arrayContaining([
      expect.objectContaining(getCorrectOutputPostItem()),
    ]),
  };
};
