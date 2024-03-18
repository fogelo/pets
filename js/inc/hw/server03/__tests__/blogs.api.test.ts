import request from "supertest";
import { correctInputBlogData } from "../__mocks__/commonTestData";
import { app } from "../src/settings";
import { IError, Status } from "../src/types";
import {
  maxDescLength,
  maxNameLength,
  maxWebsiteUrlLength,
} from "../src/validators/blogValidators";

enum Fields {
  Name = "name",
  Description = "description",
  WebsiteUrl = "websiteUrl",
}

// afterAll(async () => {
//   await app.close();
// });

const invalidInputTestCases: [string, any, string][] = [
  [
    `${Fields.Name}`,
    123,
    `Sending a non-string value for ${Fields.Name} should result in an error`,
  ],
  [
    `${Fields.Name}`,
    "a".repeat(maxNameLength + 1),
    `Sending a value for ${Fields.Name} longer than ${maxNameLength} characters should result in an error`,
  ],
  [
    `${Fields.Description}`,
    123,
    `Sending a non-string value for ${Fields.Description} should result in an error`,
  ],
  [
    `${Fields.Description}`,
    "a".repeat(maxDescLength + 1),
    `Sending a value for ${Fields.Description} longer than ${maxDescLength} characters should result in an error`,
  ],
  [
    `${Fields.WebsiteUrl}`,
    "123",
    `Sending an incorrectly formatted ${Fields.WebsiteUrl} should result in an error`,
  ],
  [
    `${Fields.WebsiteUrl}`,
    "a".repeat(maxWebsiteUrlLength + 1),
    `Sending a value for ${Fields.WebsiteUrl} longer than ${maxWebsiteUrlLength} characters should result in an error`,
  ],
];

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

  invalidInputTestCases.forEach(([field, value, message]) => {
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

  invalidInputTestCases.forEach(([field, value, message]) => {
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

describe("/blogs GET", () => {
  let blogId: string;
  beforeAll(async () => {
    await request(app).delete("/testing/all-data").auth("admin", "qwerty");

    const response = await request(app)
      .post("/blogs")
      .auth("admin", "qwerty")
      .send(correctInputBlogData);
    blogId = response.body.id;
  });

  it("all blogs must be received", async () => {
    const response = await request(app).get("/blogs").expect(Status.Ok_200);
    const allBlogs = response.body;
    const expectedAllBlogs = [
      {
        id: blogId,
        ...correctInputBlogData,
      },
    ];
    expect(allBlogs).toEqual(expectedAllBlogs);
  });

  it("the blog should be received by id", async () => {
    const response = await request(app)
      .get(`/blogs/${blogId}`)
      .expect(Status.Ok_200);

    const blog = response.body;
    const expectedBlog = {
      id: blogId,
      ...correctInputBlogData,
    };

    expect(blog).toEqual(expectedBlog);
  });
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
