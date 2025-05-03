import request from "supertest";
import { app } from "../../src/settings";
import { ViewCourseModel } from "../../src/models/ViewCourseModel";
import { CreateCourseModel } from "../../src/models/CreateCourseModel";
import { CourseType, db } from "../../src/db/db";

const testDbData: CourseType[] = [
  { id: 1, title: "front-end", studentsCount: 0 },
  { id: 2, title: "back-end", studentsCount: 0 },
  { id: 3, title: "devops", studentsCount: 0 },
  { id: 4, title: "qa", studentsCount: 0 },
];

const testViewData: ViewCourseModel[] = testDbData.map((dbData) => ({
  id: dbData.id,
  title: dbData.title,
}));

describe("CRUD /courses", () => {
  beforeEach(async () => {
    db.clear(); // очищаем данные
  });

  // тесты корректных запросов
  test("GET /courses возвращает список", async () => {
    db.courses = testDbData;
    const response = await request(app).get("/courses").expect(200);
    const courses = response.body;
    expect(courses).toEqual(testViewData);
  });

  test("GET /courses/:id возвращает по id", async () => {
    db.courses = testDbData;
    const response = await request(app).get("/courses/3").expect(200);
    const course = response.body;
    expect(course).toEqual(testViewData[2]);
  });

  test("POST /courses создает", async () => {
    const title = "title";
    const newCourse: CreateCourseModel = { title };
    await request(app).post("/courses").send(newCourse).expect(201);

    const createdCourse = db.courses[0];
    const expectedCourse: CourseType = {
      id: expect.any(Number),
      title,
      studentsCount: expect.any(Number),
    };
    expect(createdCourse).toEqual(expectedCourse);
  });

  test("PUT /courses/:id обновляет", async () => {
    const newTitle = "new title";
    db.courses = testDbData;
    await request(app).put("/courses/1").send({ title: newTitle }).expect(200);

    const updetedCourse = db.courses[0];
    const expectedCourse = { ...testDbData[0], title: newTitle };
    expect(updetedCourse).toEqual(expectedCourse);
  });

  test("DELETE /courses/:id удаляет", async () => {
    db.courses = testDbData;
    await request(app).delete("/courses/1").expect(200);
    expect(db.courses.length).toEqual(3);
  });

  // тесты неккоректных запросов
  test("GET /courses/:id возвращает статус 404, если запись не найдена", async () => {
    db.courses = testDbData;
    await request(app).get("/courses/5").expect(404);
  });
});
