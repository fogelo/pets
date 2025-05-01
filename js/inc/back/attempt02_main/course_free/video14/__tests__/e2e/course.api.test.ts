import request from "supertest";
import { app } from "../../src/settings";
import { db } from "../../src/db";

const testData = [
  { id: 1, title: "front-end" },
  { id: 2, title: "back-end" },
  { id: 3, title: "devops" },
  { id: 4, title: "qa" },
];

describe("CRUD /courses", () => {
  beforeEach(async () => {
    db.clear(); // очищаем данные
  });

  // тесты корректных запросов
  test("GET /courses возвращает список", async () => {
    db.courses = testData;
    const response = await request(app).get("/courses").expect(200);
    const courses = response.body;
    expect(courses).toEqual(testData);
  });

  test("GET /courses/:id возвращает по id", async () => {
    db.courses = testData;
    const response = await request(app).get("/courses/3").expect(200);
    const course = response.body;
    expect(course).toEqual(testData[2]);
  });

  test("POST /courses создает", async () => {
    const title = "title";
    await request(app).post("/courses").send({ title: title }).expect(201);

    const createdCourse = db.courses[0];
    expect(createdCourse).toEqual({ id: expect.any(Number), title });
  });

  test("PUT /courses/:id обновляет", async () => {
    const newTitle = "new title";
    db.courses = testData;
    await request(app).put("/courses/1").send({ title: newTitle }).expect(200);

    const updetedCourse = db.courses[0];
    const expectedCourse = { ...testData[0], title: newTitle };
    expect(updetedCourse).toEqual(expectedCourse);
  });

  test("DELETE /courses/:id удаляет", async () => {
    db.courses = testData;
    await request(app).delete("/courses/1").expect(200);
    expect(db.courses.length).toEqual(3);
  });

  // тесты неккоректных запросов
  test("GET /courses/:id возвращает статус 404, если запись не найдена", async () => {
    db.courses = testData;
    await request(app).get("/courses/5").expect(404);
  });
});
