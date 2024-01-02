const request = require("supertest");
import { HTTP_STATUSES, app } from "../../src/express-server";

describe("Тестирование endpoint /home", () => {
  it("Запрос должен вернуть объект {message: 'Home page'}", async () => {
    await request(app)
      .get("/home")
      .expect(HTTP_STATUSES.OK_200, { message: "Home page" });
  });
});

describe("Тестирование /courses", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });

  it("Запрос должен вернуть []", async () => {
    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, []);
  });

  
  it(`Запрос должен вернуть статус ${HTTP_STATUSES.BAD_REQUEST_400}`, async () => {
    await request(app)
      .post("/courses")
      .send({ title: "" })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
  });

  it("Запрос должен вернуть пустой массив", async () => {
    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, []);
  });

  it("Должен быть создан курс с корректными входными данными", async () => {
    const response = await request(app)
      .post("/courses")
      .send({ title: "new course" })
      .expect(HTTP_STATUSES.CREATED_201);

    const createdCourse = response.body;

    expect(createdCourse).toEqual({
      id: expect.any(Number),
      title: "new course",
    });

    await request(app)
      .get("/courses")
      .expect(HTTP_STATUSES.OK_200, [createdCourse]);
  });
});
