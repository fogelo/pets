import request from "supertest";
import { app } from "../src/settings";
import { IError, Status } from "../src/types";
import { CreatePostInputModel } from "../src/models/input/post/create-post-input-model";
import {
  EnchancedPostOutputModel,
  PostOutputModel,
} from "../src/models/output/post-output-model";
import {
  maxContentLength,
  maxShortDescriptionLength,
  maxTitleLength,
} from "../src/validators/post-validators";
import { correctInputBlogData } from "../__mocks__/commonTestData";
import { BlogOutputModel } from "../src/models/output/blog-output-model";

const correctInputPostData = {
  title: "string",
  shortDescription: "string",
  content: "string",
  blogId: "string",
};

enum Fields {
  Title = "title",
  ShortDescription = "shortDescription",
  Content = "content",
  BlogId = "blogId",
}

const invalidInputTestCases: [string, any, string][] = [
  [
    `${Fields.Title}`,
    123,
    `Sending a non-string value for ${Fields.Title} should result in an error`,
  ],
  [
    `${Fields.Title}`,
    "a".repeat(maxTitleLength + 1),
    `Sending a value for ${Fields.Title} longer than ${maxTitleLength} characters should result in an error`,
  ],
  [
    `${Fields.ShortDescription}`,
    123,
    `Sending a non-string value for ${Fields.ShortDescription} should result in an error`,
  ],
  [
    `${Fields.ShortDescription}`,
    "a".repeat(maxShortDescriptionLength + 1),
    `Sending a value for ${Fields.ShortDescription} longer than ${maxShortDescriptionLength} characters should result in an error`,
  ],
  [
    `${Fields.Content}`,
    123,
    `Sending a non-string value for ${Fields.Content} should result in an error`,
  ],
  [
    `${Fields.Content}`,
    "a".repeat(maxContentLength + 1),
    `Sending a value for ${Fields.Content} longer than ${maxContentLength} characters should result in an error`,
  ],
  [
    `${Fields.BlogId}`,
    123,
    `Sending a non-string value for ${Fields.BlogId} should result in an error`,
  ],
];

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

  invalidInputTestCases.forEach(([field, value, message]) => {
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

    const expectedPost: EnchancedPostOutputModel = {
      id: postResponseBody.id,
      ...correctInputPostData,
      blogId: blog.id,
      blogName: blog.name,
    };

    expect(postResponseBody).toEqual(expectedPost);
  });
});

describe("/posts PUT", () => {
  let blog: BlogOutputModel;
  let post: EnchancedPostOutputModel;
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

  invalidInputTestCases.forEach(([field, value, message]) => {
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
    const allPosts = response.body;

    const expectedPost: EnchancedPostOutputModel = {
      id: expect.any(String),
      ...correctInputPostData,
      blogId: blog.id,
      blogName: blog.name,
    };

    const expectedAllPosts = [expectedPost];
    expect(allPosts).toEqual(expectedAllPosts);
  });

  it("the post should be received by id", async () => {
    const response = await request(app)
      .get(`/posts/${post.id}`)
      .expect(Status.Ok_200);

    const expectedPost: EnchancedPostOutputModel = {
      id: expect.any(String),
      ...correctInputPostData,
      blogId: blog.id,
      blogName: blog.name,
    };

    expect(post).toEqual(expectedPost);
  });
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
