// import { app } from "../../src";
import { app } from "../../src/app";
import {
  AUTH_PATH,
  DEVICES_PATH,
  TESTING_PATH,
} from "../../src/core/paths/paths";
import request from "supertest";
import { DbManager } from "../../src/db/db";
import { HttpStatus } from "../../src/core/types/http-statuses";

describe(`CRUD ${DEVICES_PATH}`, () => {
  const user = {
    login: "testuser",
    email: "test@example.com",
    password: "P@ssw0rd",
  };
  const UAS = [
    "PostmanRuntime/1",
    "Mozilla/5.0 (Windows)",
    "curl/7.64.1",
    "CustomAgent/4.0",
  ];

  let refreshTokens: string[] = [];
  let deviceIds: string[] = [];

  beforeAll(async () => {
    await DbManager.startDb();
    await request(app).delete(`${TESTING_PATH}/all-data`);
  });

  afterAll(async () => {
    await DbManager.stopDb();
  });

  beforeEach(async () => {
    await request(app).delete(`${TESTING_PATH}/all-data`);
    // await DbManager.getDevicesCollection().deleteMany({});
    // await DbManager.getCoursesCollection().insertMany(testDbCourseData);
  });

  test("1. Регистрация и 4 логина с разными UA создают 4 сессии", async () => {
    // 1.1 регистрируем пользователя
    await request(app)
      .post(`${AUTH_PATH}/registration`)
      .send(user)
      .expect(HttpStatus.NoContent);

    for (const ua of UAS) {
      const res = await request(app)
        .post(`${AUTH_PATH}/login`)
        .set("User-Agent", ua)
        .send({ loginOrEmail: user.login, password: user.password })
        .expect(200);

      const cookie = res
        .get("Set-Cookie")
        ?.find((c: string) => c.startsWith("refreshToken="));
      const token = cookie?.split("=")[1];
      refreshTokens.push(token!);

      const list = await request(app)
        .get(DEVICES_PATH)
        .set("Cookie", `refreshToken=${token}`)
        .expect(200);

      // на каждом шаге количество должно расти на 1
      expect(list.body).toHaveLength(refreshTokens.length);
    }
  });

  test(`DELETE ${DEVICES_PATH} возваршает ошибку 404`, async () => {
    //регистрируем пользовате
    await request(app)
      .post(`${AUTH_PATH}/registration`)
      .send(user)
      .expect(HttpStatus.NoContent);

    //логинизация
    const res = await request(app)
      .post(`${AUTH_PATH}/login`)
      .set("User-Agent", "supertest")
      .send({ loginOrEmail: user.login, password: user.password })
      .expect(200);

    const cookie = res
      .get("Set-Cookie")
      ?.find((c: string) => c.startsWith("refreshToken="));
    const token = cookie?.split("=")[1];
    refreshTokens.push(token!);

    const notExistDeviceId = "63189b06003380064c4193be";
    const response = await request(app)
      .delete(`${DEVICES_PATH}/${notExistDeviceId}`)
      .set("Cookie", `refreshToken=${token}`)
      .expect(HttpStatus.NotFound);
  });
});
