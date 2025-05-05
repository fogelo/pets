import request from "supertest";
import { app, RouterPaths } from "../../src/settings";
import { ViewCourseModel } from "../../src/features/courses/models/ViewCourseModel";
import { CreateCourseModel } from "../../src/features/courses/models/CreateCourseModel";
import { mapDbCourseToViewCourseModel } from "../../src/features/courses/courses.router";
import { DbCourseModel } from "../../src/features/courses/models/DbCourseModel";
import { dbInMemory as db } from "../../src/db/db-in-memory";
import { DbManager } from "../../src/db/db";
import dotenv from "dotenv";
dotenv.config();

const testDbCourseData: DbCourseModel[] = [
  { id: 1, title: "front-end" },
  { id: 2, title: "back-end" },
  { id: 3, title: "devops" },
  { id: 4, title: "qa" },
];

const testViewCourseData: ViewCourseModel[] = testDbCourseData.map(
  mapDbCourseToViewCourseModel
);

describe(`CRUD ${RouterPaths.courses}`, () => {
  beforeAll(async () => {
    await DbManager.startDb();
  });

  afterAll(async () => {
    await DbManager.stopDb();
  });

  beforeEach(async () => {
    await DbManager.getCoursesCollection().deleteMany({});
    await DbManager.getCoursesCollection().insertMany(testDbCourseData);
  });

  // тесты корректных запросов
  test(`GET ${RouterPaths.courses} возвращает список`, async () => {
    const response = await request(app)
      .get(`${RouterPaths.courses}`)
      .expect(200);
    const courses = response.body;
    expect(courses).toEqual(testViewCourseData);
  });

  test(`GET ${RouterPaths.courses}/:id возвращает по id`, async () => {
    db.courses = testDbCourseData;
    const response = await request(app)
      .get(`${RouterPaths.courses}/3`)
      .expect(200);
    const course = response.body;
    expect(course).toEqual(testViewCourseData[2]);
  });

  test(`POST ${RouterPaths.courses} создает`, async () => {
    const title = "title";
    const newCourse: CreateCourseModel = { title };
    const result = await request(app)
      .post(`${RouterPaths.courses}`)
      .auth("admin", "qwerty")
      .send(newCourse)
      .expect(201);

    const createdCourse = result.body;
    const expectedCourse: DbCourseModel = {
      id: expect.any(Number),
      title,
    };
    expect(createdCourse).toEqual(expectedCourse);
  });

  test(`PUT ${RouterPaths.courses}/:id обновляет`, async () => {
    const newTitle = "new title";
    const id = 1;
    db.courses = testDbCourseData;
    await request(app)
      .put(`${RouterPaths.courses}/${id}`)
      .send({ title: newTitle })
      .expect(200);

    const updatedCourse = await DbManager.getCoursesCollection().findOne({
      id,
    });
    const expectedCourse = { ...testDbCourseData[0], title: newTitle };
    expect(updatedCourse).toEqual(expectedCourse);
  });

  test(`DELETE ${RouterPaths.courses}/:id удаляет`, async () => {
    await request(app).delete(`${RouterPaths.courses}/1`).expect(200);
    const courses = await DbManager.getCoursesCollection().find({}).toArray();
    expect(courses.length).toEqual(3);
  });

  // тесты неккоректных запросов
  test(`GET ${RouterPaths.courses}/:id возвращает статус 404, если запись не найдена`, async () => {
    await request(app).get(`${RouterPaths.courses}/5`).expect(404);
  });
});
