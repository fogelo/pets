import request from "supertest";
import { app } from "../../src/settings";
import { Status } from "../../src/models/common";
import { CreatePostInputModel } from "../../src/models/input/post/create.post.input.model";
import { correctInputBlogData } from "../../__mocks__/blog.test.data";
import { BlogOutputModel } from "../../src/models/output/blog.output.model";
import { PostOutputModel } from "../../src/models/output/post.output.model";
import { client } from "../../src/db/db";
import { postCorrectInputData } from "../../__mocks__/post.test.data";

afterAll(async () => {
  await client.close();
});

describe("/posts DELETE", () => {
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

  it("should be 401 auth error", async () => {
    await request(app)
      .delete(`/posts/${post.id}`)
      .auth("admin", "qwertyy")
      .expect(Status.Unauthorized_401);
  });

  it("there should be a 404 status when deleting a non-existent post", async () => {
    await request(app)
      .delete("/posts/123")
      .auth("admin", "qwerty")
      .expect(Status.NotFound_404);
  });

  it("the post should be deleted", async () => {
    await request(app)
      .delete(`/posts/${post.id}`)
      .auth("admin", "qwerty")
      .expect(Status.NoContent_204);
  });
});
