import request from "supertest";
import { app } from "../src/settings";
import { IError, Status } from "../src/types";

export const correctBlogData = {
  name: "google",
  description: "search engine",
  websiteUrl: "https://www.google.com",
};

const updatedCorrectBlogData = {
  name: "google2",
  description: "search engine2",
  websiteUrl: "https://www.google2.com",
};

const incorrectBlogData = {
  name: "google",
  description: "search engine",
  websiteUrl: 123,
};

describe("/blogs", () => {
  beforeAll(async () => {
    await request(app).delete("/testing/all-data").auth("admin", "qwerty");
  });

  it("responds error with description field", async () => {
    const blog = {
      name: "google",
      description: 123,
      websiteUrl: "https://www.google.com",
    };

    const expectedError: IError = {
      errorsMessages: [
        { field: expect.any(String), message: expect.any(String) },
      ],
    };

    const { body: error } = await request(app)
      .post("/blogs")
      .auth("admin", "qwerty")
      .send(blog)
      .expect(Status.BadRequest_400);

    expect(error).toEqual(expectedError);
  });

  it("the title should not contain more than 15 characters", async () => {
    const blog = {
      name: "more than 15 characters",
      description: "search engine",
      websiteUrl: "https://www.google.com",
    };

    const expectedError: IError = {
      errorsMessages: [
        { field: expect.any(String), message: expect.any(String) },
      ],
    };

    const { body: error } = await request(app)
      .post("/blogs")
      .auth("admin", "qwerty")
      .send(blog)
      .expect(Status.BadRequest_400);

    expect(error).toEqual(expectedError);
  });

  it("the blog must be created", async () => {
    await request(app)
      .post("/blogs")
      .auth("admin", "qwerty")
      .send(correctBlogData)
      .expect(Status.Created_201);
  });

  it("all blogs must be received without auth", async () => {
    const response = await request(app).get("/blogs").expect(Status.Ok_200);
    const blogs = response.body;
    expect(blogs).toEqual([{ id: expect.any(String), ...correctBlogData }]);

    expect.setState({ blogId: blogs[0]?.id });
  });

  it("the blog must be received by id without auth", async () => {
    const { blogId } = expect.getState();
    const response = await request(app)
      .get(`/blogs/${blogId}`)
      .expect(Status.Ok_200);

    const blog = response.body;

    expect(blog).toEqual({ id: expect.any(String), ...correctBlogData });
  });

  it("should be 404 status when there is no blog", async () => {
    await request(app).get("/blogs/123").expect(Status.NotFound_404);
  });

  it("the blog must be updated correctly", async () => {
    await request(app)
      .put("/blogs/123")
      .auth("admin", "qwerty")
      .send(correctBlogData)
      .expect(Status.NotFound_404);

    const { blogId } = expect.getState();

    await request(app)
      .put(`/blogs/${blogId}`)
      .send(correctBlogData)
      .expect(Status.Unauthorized_401);

    await request(app)
      .put(`/blogs/${blogId}`)
      .auth("admin", "qwerty")
      .send(incorrectBlogData)
      .expect(Status.BadRequest_400);

    await request(app)
      .put(`/blogs/${blogId}`)
      .auth("admin", "qwerty")
      .send(updatedCorrectBlogData)
      .expect(Status.NoContent_204);

    const response = await request(app)
      .get(`/blogs/${blogId}`)
      .expect(Status.Ok_200);
    const blog = response.body;
    expect(blog).toEqual({ id: blogId, ...updatedCorrectBlogData });
  });

  it("the blog should be deleted", async () => {
    await request(app).delete("/blogs/123").expect(Status.Unauthorized_401);

    await request(app)
      .delete("/blogs/123")
      .auth("admin", "qwerty")
      .expect(Status.NotFound_404);

    const { blogId } = expect.getState();

    await request(app)
      .delete(`/blogs/${blogId}`)
      .auth("admin", "qwerty")
      .expect(Status.NoContent_204);
  });
});
