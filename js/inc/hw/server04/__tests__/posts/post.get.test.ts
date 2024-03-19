import request from "supertest";
import { correctInputBlogData } from "../../__mocks__/blog.test.data";
import { postCorrectInputData } from "../../__mocks__/post.test.data";
import { client } from "../../src/db/db";
import { Status } from "../../src/models/common";
import { CreatePostInputModel } from "../../src/models/input/post/create.post.input.model";
import { BlogOutputModel } from "../../src/models/output/blog.output.model";
import { PostOutputModel } from "../../src/models/output/post.output.model";
import { app } from "../../src/settings";

afterAll(async () => {
  await client.close();
});

describe("/posts GET", () => {
  let blog: BlogOutputModel;
  let post: PostOutputModel;
  let postRequestBody: CreatePostInputModel;

  beforeAll(async () => {
    await request(app).delete("/testing/all-data").auth("admin", "qwerty");

    const blogResponse = await request(app)
      .post("/blogs")
      .auth("admin", "qwerty")
      .send(correctInputBlogData);

    blog = blogResponse.body;
    postRequestBody = {
      ...postCorrectInputData,
      blogId: blog.id,
    };

    const postResponse = await request(app)
      .post("/posts")
      .auth("admin", "qwerty")
      .send(postRequestBody)
      .expect(Status.Created_201);

    post = postResponse.body;
  });

  it("all posts must be received", async () => {
    const response = await request(app).get("/posts").expect(Status.Ok_200);
    const allPosts = response.body;

    const expectedPost: PostOutputModel = {
      id: expect.any(String),
      ...postCorrectInputData,
      blogId: blog.id,
      blogName: blog.name,
      createdAt: expect.any(String),
    };

    const expectedAllPosts = [expectedPost];
    expect(allPosts).toEqual(expectedAllPosts);
  });

  it("the post should be received by id", async () => {
    const response = await request(app)
      .get(`/posts/${post.id}`)
      .expect(Status.Ok_200);

    const expectedPost: PostOutputModel = {
      id: expect.any(String),
      ...postCorrectInputData,
      blogId: blog.id,
      blogName: blog.name,
      createdAt: expect.any(String),
    };

    expect(post).toEqual(expectedPost);
  });
});
