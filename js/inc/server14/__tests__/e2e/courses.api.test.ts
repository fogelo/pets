import { HTTP_STATUSES, app } from "../../src";
import request from "supertest";

// тестируем /courses
describe("/courses", () => {
  // beforeAll - какая-то процедура подготовки нашей БД для проведения тестов, в данном случае очищаем массив с курсами
  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });

  it("Запрос должен вернуть []", async () => {
    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, []);
  });

  it("Курс не должен добавиться", async () => {
    // этот запрос не должен создат курс
    await request(app)
      .post("/courses")
      .send({ title: 123 })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);

    //этот запрос, чтобы убедиться, что курс не создался
    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, []);
  });

  it("Курс должен корректно добавиться", async () => {
    //проверяем,что курс создан
    const response = await request(app)
      .post("/courses")
      .send({ title: "Новый курс" })
      .expect(HTTP_STATUSES.CREATED_201);

    //при корректном добавлении должен корректно вернуться, причем id должен быть строкой
    const createdCourse = response.body;
    expect(createdCourse).toEqual({
      id: expect.any(String),
      title: "Новый курс",
    });

    // проверяем добавился ли он корректно в базу данных
    await request(app)
      .get("/courses")
      .expect(HTTP_STATUSES.OK_200, [createdCourse]);
  });
});
