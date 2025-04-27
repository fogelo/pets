import request from "supertest";
import { correctInputBlogData } from "../../../__mocks__/blog.test.data";
import { correctInputPostData, postIncorrectInputTestCases } from "../../../__mocks__/post.test.data";
import { client } from "../../../src/db/db";
import { IError, Status } from "../../../src/models/common";
import { CreatePostInputModel } from "../../../src/models/input/post/create.post.input.model";
import { BlogOutputModel } from "../../../src/models/output/blog.output.model";
import { PostOutputModel } from "../../../src/models/output/post.output.model";
import { app } from "../../../src/settings";

afterAll(async () => {
  await client.close();
});

describe("/posts POST", () => {
  let blog: BlogOutputModel;
  beforeAll(async () => {
    await request(app).delete("/testing/all-data").auth("admin", "qwerty");

    const blogResponse = await request(app)
      .post("/blogs")
      .auth("admin", "qwerty")
      .send(correctInputBlogData);
    blog = blogResponse.body;
  });

  it("should be auth error", async () => {
    await request(app)
      .post("/posts")
      .send(correctInputPostData)
      .expect(Status.Unauthorized_401);
  });

  postIncorrectInputTestCases.forEach(([field, value, message]) => {
    it(message, async () => {
      const testData = {
        ...correctInputPostData,
        blogId: blog.id,
        [field]: value,
      };
      const response = await request(app)
        .post("/posts")
        .auth("admin", "qwerty")
        .send(testData)
        .expect(Status.BadRequest_400);

      const error = response.body;
      const expectedError: IError = {
        errorsMessages: [{ field, message: expect.any(String) }],
      };
      expect(error).toEqual(expectedError);
    });
  });

  it("should be created post", async () => {
    const postRequestBody: CreatePostInputModel = {
      ...correctInputPostData,
      blogId: blog.id,
    };

    const postResponse = await request(app)
      .post("/posts")
      .auth("admin", "qwerty")
      .send(postRequestBody)
      .expect(Status.Created_201);

    const postResponseBody: PostOutputModel = postResponse.body;

    const expectedPost: PostOutputModel = {
      id: postResponseBody.id,
      ...correctInputPostData,
      blogId: blog.id,
      blogName: blog.name,
      createdAt: expect.any(String)
    };

    expect(postResponseBody).toEqual(expectedPost);
  });
});
