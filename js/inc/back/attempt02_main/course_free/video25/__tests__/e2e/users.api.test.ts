import request from "supertest";
import { app, RouterPaths } from "../../src/settings";
import { ViewUserModel } from "../../src/features/users/models/ViewUserModel";
import { CreateUserModel } from "../../src/features/users/models/CreateUserModel";
import { mapDbUserToViewUserModel } from "../../src/features/users/users.router";
import { DbUserModel } from "../../src/features/users/models/DbUserModel";
import { dbInMemory as db } from "../../src/db/db-in-memory";

const testDbUserData: DbUserModel[] = [
  { id: 1, userName: "dimych" },
  { id: 2, userName: "ivan" },
  { id: 3, userName: "anton" },
];

const testViewUserData: ViewUserModel[] =
  testDbUserData.map(mapDbUserToViewUserModel);

describe(`CRUD ${RouterPaths.users}`, () => {
  beforeEach(async () => {
    db.clear(); // очищаем данные
  });

  // тесты корректных запросов
  test(`GET ${RouterPaths.users} возвращает список`, async () => {
    db.users = testDbUserData;
    const response = await request(app).get(`${RouterPaths.users}`).expect(200);
    const users = response.body;
    expect(users).toEqual(testViewUserData);
  });

  test(`GET ${RouterPaths.users}/:id возвращает по id`, async () => {
    db.users = testDbUserData;
    const response = await request(app)
      .get(`${RouterPaths.users}/3`)
      .expect(200);
    const user = response.body;
    expect(user).toEqual(testViewUserData[2]);
  });

  test(`POST ${RouterPaths.users} создает`, async () => {
    const userName = "userName";
    const newUser: CreateUserModel = { userName };
    await request(app).post(`${RouterPaths.users}`).send(newUser).expect(201);

    const createdUser = db.users[0];
    const expectedUser: DbUserModel = {
      id: expect.any(Number),
      userName,
    };
    expect(createdUser).toEqual(expectedUser);
  });

  test(`PUT ${RouterPaths.users}/:id обновляет`, async () => {
    const newUserName = "new user name";
    db.users = testDbUserData;
    await request(app)
      .put(`${RouterPaths.users}/1`)
      .send({ userName: newUserName })
      .expect(200);

    const updatedUser = db.users[0];
    const expectedUser = { ...testDbUserData[0], userName: newUserName };
    expect(updatedUser).toEqual(expectedUser);
  });

  test(`DELETE ${RouterPaths.users}/:id удаляет`, async () => {
    db.users = testDbUserData;
    await request(app).delete(`${RouterPaths.users}/1`).expect(200);
    expect(db.users.length).toEqual(2);
  });

  // тесты неккоректных запросов
  test(`GET ${RouterPaths.users}/:id возвращает статус 404, если запись не найдена`, async () => {
    db.users = testDbUserData;
    await request(app).get(`${RouterPaths.users}/5`).expect(404);
  });
});
