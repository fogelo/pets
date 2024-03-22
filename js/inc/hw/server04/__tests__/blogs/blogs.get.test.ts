import request from "supertest";
import { Pagination, Status } from "../../src/models/common";
import { CreateBlogInputModel } from "../../src/models/input/blog/create.blog.input.model";
import { BlogOutputModel } from "../../src/models/output/blog.output.model";
import { app } from "../../src/settings";
import { client } from "../../src/db/db";
import { correctInputBlogData } from "../../__mocks__/blog.test.data";
import { CreatePostInputModel } from "../../src/models/input/post/create.post.input.model";
import { PostOutputModel } from "../../src/models/output/post.output.model";
import {
  getCorrectOutputBlogItem,
  getCorrectOutputBlogsBody,
  getCorrectOutputPostsBody,
} from "../../__mocks__/correct.data";

afterAll(async () => {
  await client.close();
});

describe("/blogs GET", () => {
  beforeAll(async () => {
    await request(app).delete("/testing/all-data").auth("admin", "qwerty");

    const range = [...Array(100).keys()];
    const responses = await Promise.all(
      range.map((value) => {
        const coorectInputBlog: CreateBlogInputModel = {
          name: `google${value}`,
          description: `unique blog description ${
            new Date().getTime() + value
          }`,
          isMembership: false,
          websiteUrl: `https://www.google${value}.com`,
        };
        return request(app)
          .post("/blogs")
          .auth("admin", "qwerty")
          .send(coorectInputBlog);
      })
    );
  });

  it("должен вернуть блоги с дефолтными параметрами (desc)", async () => {
    const response = await request(app).get("/blogs");
    const blogs: Pagination<BlogOutputModel> = response.body;
    expect(response.statusCode).toBe(Status.Ok_200);
    expect(blogs).toEqual(getCorrectOutputBlogsBody());

    const isSortedByCreatedAtDesc = blogs.items.every((item, index, arr) => {
      return (
        index === 0 ||
        new Date(item.createdAt).getTime() <=
          new Date(arr[index - 1].createdAt).getTime()
      );
    });
    expect(isSortedByCreatedAtDesc).toBe(true);
  });

  it("должен вернуть блоги отфильтрованные по полю name", async () => {
    const response = await request(app).get("/blogs?searchNameTerm=1");
    const blogs: Pagination<BlogOutputModel> = response.body;
    expect(response.statusCode).toBe(Status.Ok_200);
    expect(blogs).toEqual(getCorrectOutputBlogsBody());
  });

  it("должен вернуть блоги с сортировкой по дате создания asc", async () => {
    const response = await request(app).get(
      "/blogs?sortBy=createdAt&sortDirection=asc"
    );
    const blogs: Pagination<BlogOutputModel> = response.body;
    expect(response.statusCode).toBe(Status.Ok_200);
    expect(blogs).toEqual(getCorrectOutputBlogsBody());

    const isSortedByCreatedAt = blogs.items
      .every((item, index, arr) => {
        return (
          index === 0 ||
          new Date(item.createdAt).getTime() >=
            new Date(arr[index - 1].createdAt).getTime()
        );
      });
    expect(isSortedByCreatedAt).toBe(true);
  });

  it("должен вернуть верное кол-во блогов", async () => {
    const pageNumber = 2;
    const pageSize = 5;
    const response = await request(app).get(
      `/blogs?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
    const blogs: Pagination<BlogOutputModel> = response.body;
    expect(response.statusCode).toBe(Status.Ok_200);
    expect(blogs.items.length).toBe(pageSize);
    expect(blogs.page).toBe(pageNumber);
  });

  it("должен вернуть блог по его id", async () => {
    const pageNumber = 1;
    const pageSize = 1;
    const blogsResponse = await request(app).get(
      `/blogs?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
    const blogs: Pagination<BlogOutputModel> = blogsResponse.body;
    const blogId = blogs.items[0].id;
    const blogResponse = await request(app).get(`/blogs/${blogId}`);
    expect(blogResponse.statusCode).toBe(Status.Ok_200);
    expect(blogResponse.body).toEqual(getCorrectOutputBlogItem());
  });
});

describe("/blogs/:id/posts GET", () => {
  let blog: BlogOutputModel;
  beforeAll(async () => {
    await request(app).delete("/testing/all-data").auth("admin", "qwerty");
    await request(app)
      .post("/blogs")
      .auth("admin", "qwerty")
      .send(correctInputBlogData);

    const response = await request(app).get("/blogs");
    const blogs: Pagination<BlogOutputModel> = response.body;
    blog = blogs.items[0];

    const range = [...Array(100).keys()];

    const responses = await Promise.all(
      range.map((value) => {
        const postCorrectInputData: CreatePostInputModel = {
          content: `string${value}`,
          shortDescription: `string${value}`,
          title: `string${value}`,
          blogId: blog.id,
        };
        return request(app)
          .post(`/posts`)
          .auth("admin", "qwerty")
          .send(postCorrectInputData);
      })
    );
  });

  it("/blogs/:id/posts, должен вернуть посты с дефолтными параметрами", async () => {
    const response = await request(app).get(`/blogs/${blog.id}/posts`);
    const posts: Pagination<PostOutputModel> = response.body;
    expect(response.statusCode).toBe(Status.Ok_200);
    expect(posts).toEqual(getCorrectOutputPostsBody());
    const isSortedByCreatedAt = posts.items.every((item, index, arr) => {
      return (
        index === 0 ||
        new Date(item.createdAt).getTime() <=
          new Date(arr[index - 1].createdAt).getTime()
      );
    });
    expect(isSortedByCreatedAt).toBe(true);
  });
});
