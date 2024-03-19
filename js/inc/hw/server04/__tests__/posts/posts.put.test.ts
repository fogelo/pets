import request from "supertest";
import { correctInputBlogData } from "../../__mocks__/blog.test.data";
import { postCorrectInputData, postIncorrectInputTestCases } from "../../__mocks__/post.test.data";
import { client } from "../../src/db/db";
import { IError, Status } from "../../src/models/common";
import { CreatePostInputModel } from "../../src/models/input/post/create.post.input.model";
import { BlogOutputModel } from "../../src/models/output/blog.output.model";
import { PostOutputModel } from "../../src/models/output/post.output.model";
import { app } from "../../src/settings";

afterAll(async () => {
  await client.close();
});

describe("/posts PUT", () => {
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

  it("should be auth error", async () => {
    await request(app)
      .put(`/posts/${post.id}`)
      .auth("admin", "qwertyy")
      .send(postRequestBody)
      .expect(Status.Unauthorized_401);
  });

  it("should be 404", async () => {
    await request(app)
      .put(`/posts/123`)
      .auth("admin", "qwerty")
      .send(postRequestBody)
      .expect(Status.NotFound_404);
  });

  postIncorrectInputTestCases.forEach(([field, value, message]) => {
    it(message, async () => {
      const testData = { ...post, [field]: value };
      const response = await request(app)
        .put(`/posts/${post.id}`)
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
});
