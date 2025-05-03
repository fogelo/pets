import request from "supertest";
import { app, RouterPaths } from "../../src/settings";
import { BindingType, UserType, db } from "../../src/db/db";
import { ViewBindingModel } from "../../src/features/users-courses-bindings/models/ViewBindingModel";
import { CreateBindingModel } from "../../src/features/users-courses-bindings/models/CreateBindingModel";
import { mapBindingToViewModel } from "../../src/features/users-courses-bindings/users-courses-bindings.router";

const testDbData: BindingType[] = [
  { id: 1, userId: 1, courseId: 1, date: new Date(2022, 10, 1) },
  { id: 2, userId: 1, courseId: 2, date: new Date(2022, 10, 1) },
  { id: 3, userId: 2, courseId: 2, date: new Date(2022, 10, 1) },
];

const testViewModelData: ViewBindingModel[] = testDbData.map(
  mapBindingToViewModel
);

describe(`CRUD ${RouterPaths.bindings}`, () => {
  beforeEach(async () => {
    db.clear(); // очищаем бд
  });

  test(`POST ${RouterPaths.bindings} создает`, async () => {
    const binding: CreateBindingModel = {
      userId: 1,
      courseId: 1,
    };

    await request(app)
      .post(`${RouterPaths.bindings}`)
      .send(binding)
      .expect(201);

    const createdBinding = db.userCourseBindings[0];
    const expectedBinding: BindingType = {
      id: expect.any(Number),
      ...binding,
      date: expect.any(Date),
    };
    expect(createdBinding).toEqual(expectedBinding);
  });
});
