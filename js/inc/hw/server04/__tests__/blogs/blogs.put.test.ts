import request from "supertest";
import {
  correctInputBlogData,
  blogIncorrectInputTestCases,
} from "../../__mocks__/blog.test.data";
import { client } from "../../src/db/db";
import { IError, Status } from "../../src/models/common";
import { app } from "../../src/settings";

afterAll(async () => {
  await client.close();
});

describe("/blogs PUT", () => {
  let blogId: string;

  beforeAll(async () => {
    await request(app).delete("/testing/all-data").auth("admin", "qwerty");
    const response = await request(app)
      .post("/blogs")
      .auth("admin", "qwerty")
      .send(correctInputBlogData);
    blogId = response.body.id;
  });

  blogIncorrectInputTestCases.forEach(([field, value, message]) => {
    it(message, async () => {
      const testData = { ...correctInputBlogData, [field]: value };
      const response = await request(app)
        .put(`/blogs/${blogId}`)
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

  it("should be auth error", async () => {
    await request(app)
      .put(`/blogs/${blogId}`)
      .send(correctInputBlogData)
      .expect(Status.Unauthorized_401);
  });

  it("the blog must be updated", async () => {
    await request(app)
      .put(`/blogs/${blogId}`)
      .auth("admin", "qwerty")
      .send(correctInputBlogData)
      .expect(Status.NoContent_204);
  });

  it("the blog must be updated", async () => {
    await request(app)
      .put("/blogs/123")
      .auth("admin", "qwerty")
      .send(correctInputBlogData)
      .expect(Status.NotFound_404);
  });
});
