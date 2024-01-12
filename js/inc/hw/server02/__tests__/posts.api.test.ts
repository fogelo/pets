import request from "supertest";
import { app } from "../src/settings";
import { PostInputModel, PostViewModel, Status } from "../src/types";
import { correctBlogData } from "./blogs.api.test";

const newCorrectPostBody: PostInputModel = {
  title: "string",
  shortDescription: "string",
  content: "string",
  blogId: "string",
};

describe("/posts", () => {
  beforeAll(async () => {
    await request(app).delete("/testing/all-data").auth("admin", "qwerty");
    const response = await request(app)
      .post("/blogs")
      .auth("admin", "qwerty")
      .send(correctBlogData);
  });

  it("should be auth error 401", async () => {
    await request(app).post("/posts").expect(Status.Unauthorized_401);
    await request(app)
      .post("/posts")
      .auth("admin", "qwertyy")
      .expect(Status.Unauthorized_401);
  });

  const fieldsToTest = Object.keys(newCorrectPostBody);

  fieldsToTest.forEach((field) => {
    it(`should validate the ${field} field`, async () => {
      // Создайте копию объекта с неверным значением для текущего поля
      let testData = { ...newCorrectPostBody, [field]: "incorrect value" };

      // Отправьте testData и проверьте, что сервер возвращает ошибку валидации
      await request(app)
        .post("/posts")
        .send(testData)
        .expect((response) => {
          expect(response.status).toBe(400); // или любой другой код ошибки валидации
          // Дополнительно можно проверить сообщение об ошибке
          expect(response.body.message).toContain(`Invalid ${field}`);
        });
    });
  });

  it("should be created post", async () => {
    const createPostResponse = await request(app)
      .post("/posts")
      .auth("admin", "qwerty")
      .send(newCorrectPostBody)
      .expect(Status.Created_201);

    const createdPost1: PostViewModel = createPostResponse.body;
    expect(createdPost1).toEqual({
      id: expect.any(String),
      ...newCorrectPostBody,
      blogName: expect.any(String),
    });

    const getPostByIdResponse = await request(app)
      .get(`/posts/${createdPost1.id}`)
      .expect(Status.Ok_200);

    const createdPost2: PostViewModel = getPostByIdResponse.body;
    expect(createdPost2).toEqual({
      id: expect.any(String),
      ...newCorrectPostBody,
      blogName: expect.any(String),
    });
  });
});
