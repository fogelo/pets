import request from "supertest";
import { correctInputBlogData } from "../../__mocks__/blog.test.data";
import { Status } from "../../src/models/common";
import { app } from "../../src/settings";
import { client } from "../../src/db/db";

afterAll(async () => {
  await client.close();
});

describe("/blogs DELETE", () => {
  let blogId: string;

  beforeAll(async () => {
    await request(app).delete("/testing/all-data").auth("admin", "qwerty");

    const response = await request(app)
      .post("/blogs")
      .auth("admin", "qwerty")
      .send(correctInputBlogData);
    blogId = response.body.id;
  });

  it("should be 401 auth error", async () => {
    await request(app)
      .delete(`/blogs/${blogId}`)
      .auth("admin", "qwert1")
      .expect(Status.Unauthorized_401);
  });

  it("there should be a 404 status when deleting a non-existent blog", async () => {
    await request(app)
      .delete("/blogs/123")
      .auth("admin", "qwerty")
      .expect(Status.NotFound_404);
  });

  it("the blog should be deleted", async () => {
    await request(app)
      .delete(`/blogs/${blogId}`)
      .auth("admin", "qwerty")
      .expect(Status.NoContent_204);
  });
});
