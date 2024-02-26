import { HTTP_STATUSES, app } from "../../src";
import request from "supertest";
import { CreateCourseModel } from "../../src/models/CreateCourseModel";
import { QueryCourseModel } from "../../src/models/QueryCourseModel";

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
    const data = { title: 123 };
    // этот запрос не должен создат курс
    await request(app)
      .post("/courses")
      .send(data)
      .expect(HTTP_STATUSES.BAD_REQUEST_400);

    //этот запрос, чтобы убедиться, что курс не создался
    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, []);
  });

  it("Курс должен корректно добавиться", async () => {
    const createData: CreateCourseModel = { title: "Новый курс" };
    //проверяем,что курс создан
    const response = await request(app)
      .post("/courses")
      .send(createData)
      .expect(HTTP_STATUSES.CREATED_201);

    //при корректном добавлении должен корректно вернуться, причем id должен быть строкой
    const createdCourse = response.body;
    const gotData: QueryCourseModel = {
      id: expect.any(String),
      title: "Новый курс",
    };
    expect(createdCourse).toEqual(gotData);

    // проверяем добавился ли он корректно в базу данных
    await request(app)
      .get("/courses")
      .expect(HTTP_STATUSES.OK_200, [createdCourse]);
  });
});
