import request from "supertest";
import { correctInputBlogData } from "../../__mocks__/blog.test.data";
import { correctInputPostData } from "../../__mocks__/post.test.data";
import { client } from "../../src/db/db";
import { Pagination, Status } from "../../src/models/common";
import { CreatePostInputModel } from "../../src/models/input/post/create.post.input.model";
import { BlogOutputModel } from "../../src/models/output/blog.output.model";
import { PostOutputModel } from "../../src/models/output/post.output.model";
import { app } from "../../src/settings";
import {
  getCorrectOutputPostItem,
  getCorrectOutputPostsBody,
} from "../../__mocks__/correct.data";

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
      ...correctInputPostData,
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
    const posts: Pagination<PostOutputModel> = response.body;
    expect(posts).toEqual(getCorrectOutputPostsBody());
  });

  it("the post should be received by id", async () => {
    const response = await request(app)
      .get(`/posts/${post.id}`)
      .expect(Status.Ok_200);

    expect(response.body).toEqual(getCorrectOutputPostItem());
  });
});
