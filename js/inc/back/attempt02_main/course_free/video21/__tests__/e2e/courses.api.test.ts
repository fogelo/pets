import request from "supertest";
import { app, RouterPaths } from "../../src/settings";
import { ViewCourseModel } from "../../src/features/courses/models/ViewCourseModel";
import { CreateCourseModel } from "../../src/features/courses/models/CreateCourseModel";
import { CourseType, db } from "../../src/db/db";
import { mapCourseToViewModel } from "../../src/features/courses/courses.router";

const testDbCourseData: CourseType[] = [
  { id: 1, title: "front-end" },
  { id: 2, title: "back-end" },
  { id: 3, title: "devops" },
  { id: 4, title: "qa" },
];

const testViewCourseData: ViewCourseModel[] =
  testDbCourseData.map(mapCourseToViewModel);

describe(`CRUD ${RouterPaths.courses}`, () => {
  beforeEach(async () => {
    db.clear(); // очищаем данные
  });

  // тесты корректных запросов
  test(`GET ${RouterPaths.courses} возвращает список`, async () => {
    db.courses = testDbCourseData;
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
    await request(app)
      .post(`${RouterPaths.courses}`)
      .auth('admin', 'qwerty') 
      .send(newCourse)
      .expect(201);

    const createdCourse = db.courses[0];
    const expectedCourse: CourseType = {
      id: expect.any(Number),
      title,
    };
    expect(createdCourse).toEqual(expectedCourse);
  });

  test(`PUT ${RouterPaths.courses}/:id обновляет`, async () => {
    const newTitle = "new title";
    db.courses = testDbCourseData;
    await request(app)
      .put(`${RouterPaths.courses}/1`)
      .send({ title: newTitle })
      .expect(200);

    const updatedCourse = db.courses[0];
    const expectedCourse = { ...testDbCourseData[0], title: newTitle };
    expect(updatedCourse).toEqual(expectedCourse);
  });

  test(`DELETE ${RouterPaths.courses}/:id удаляет`, async () => {
    db.courses = testDbCourseData;
    await request(app).delete(`${RouterPaths.courses}/1`).expect(200);
    expect(db.courses.length).toEqual(3);
  });

  // тесты неккоректных запросов
  test(`GET ${RouterPaths.courses}/:id возвращает статус 404, если запись не найдена`, async () => {
    db.courses = testDbCourseData;
    await request(app).get(`${RouterPaths.courses}/5`).expect(404);
  });
});
