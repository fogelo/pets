import request from "supertest";
import {
  correctInputBlogData,
  blogIncorrectInputTestCases,
} from "../../__mocks__/blog.test.data";
import { client } from "../../src/db/db";
import { IError, Pagination, Status } from "../../src/models/common";
import { app } from "../../src/settings";
import {
  postIncorrectInputTestCases,
  postCorrectInputData,
} from "../../__mocks__/post.test.data";
import { BlogOutputModel } from "../../src/models/output/blog.output.model";

afterAll(async () => {
  await client.close();
});

describe("/blogs POST", () => {
  beforeAll(async () => {
    await request(app).delete("/testing/all-data").auth("admin", "qwerty");
  });

  it("should be auth error", async () => {
    await request(app)
      .post("/blogs")
      .send(correctInputBlogData)
      .expect(Status.Unauthorized_401);
  });

  blogIncorrectInputTestCases.forEach(([field, value, message]) => {
    it(message, async () => {
      const testData = { ...correctInputBlogData, [field]: value };
      const response = await request(app)
        .post("/blogs")
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

  it("the blog must be created", async () => {
    await request(app)
      .post("/blogs")
      .auth("admin", "qwerty")
      .send(correctInputBlogData)
      .expect(Status.Created_201);
  });
});

describe("/blogs/:id/posts POST", () => {
  let blog: BlogOutputModel;
  beforeAll(async () => {
    await request(app).delete("/testing/all-data").auth("admin", "qwerty");
    await request(app)
      .post("/blogs")
      .auth("admin", "qwerty")
      .send(correctInputBlogData);
    const reponse = await request(app).get("/blogs");
    const blogs: Pagination<BlogOutputModel> = reponse.body;
    blog = blogs.items[0];
  });

  it("should be auth error", async () => {
    await request(app)
      .post("/blogs")
      .send(correctInputBlogData)
      .expect(Status.Unauthorized_401);
  });

  postIncorrectInputTestCases.forEach(([field, value, message]) => {
    it(message, async () => {
      const testData = {
        ...postCorrectInputData,
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

  it("the blog must be created", async () => {
    await request(app)
      .post("/blogs")
      .auth("admin", "qwerty")
      .send(correctInputBlogData)
      .expect(Status.Created_201);
  });
});
