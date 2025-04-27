import request from "supertest";
import { loginIncorrectInputTestCases } from "../../../__mocks__/auth.test.data";
import { correctInputUserData } from "../../../__mocks__/user.test.data";
import { client } from "../../../src/db/db";
import { IError, Status } from "../../../src/models/common";
import { LoginInputModel } from "../../../src/models/input/auth/login.input.model";
import { app } from "../../../src/settings";

afterAll(async () => {
  await client.close();
});

const correctInputLoginData: LoginInputModel = {
  loginOrEmail: correctInputUserData.email,
  password: correctInputUserData.password,
};

describe("/auth/login POST", () => {
  let user;
  beforeAll(async () => {
    await request(app).delete("/testing/all-data").auth("admin", "qwerty");

    user = await request(app)
      .post("/users")
      .auth("admin", "qwerty")
      .send(correctInputUserData)
      .expect(Status.Created_201);
  });

  it("должен вернуть 204 статус", async () => {
    const correctInputLoginData1: LoginInputModel = {
      loginOrEmail: correctInputUserData.login,
      password: correctInputUserData.password,
    };
    await request(app)
      .post("/auth/login")
      .send(correctInputLoginData1)
      .expect(Status.NoContent_204);

    const correctInputLoginData2: LoginInputModel = {
      loginOrEmail: correctInputUserData.email,
      password: correctInputUserData.password,
    };
    await request(app)
      .post("/auth/login")
      .send(correctInputLoginData2)
      .expect(Status.NoContent_204);
  });

  it("должен вернуть 401 статус", async () => {
    const correctInputLoginData1: LoginInputModel = {
      loginOrEmail: correctInputUserData.login + "1",
      password: correctInputUserData.password,
    };
    await request(app)
      .post("/auth/login")
      .send(correctInputLoginData1)
      .expect(Status.Unauthorized_401);

    const correctInputLoginData2: LoginInputModel = {
      loginOrEmail: correctInputUserData.email,
      password: correctInputUserData.password + "1",
    };
    await request(app)
      .post("/auth/login")
      .send(correctInputLoginData2)
      .expect(Status.Unauthorized_401);
  });

  loginIncorrectInputTestCases.forEach(([field, value, message]) => {
    it(message, async () => {
      const testData = { ...correctInputLoginData, [field]: value };
      const response = await request(app)
        .post("/auth/login")
        .auth("admin", "qwerty")
        .send(testData)
        .expect(Status.BadRequest_400);

      const error = response.body;
      const expectedError: IError = {
        errorsMessages: [{ field, message: expect.any(String) }],
      };
      expect(error).toEqual(expectedError);
    });
  });
});
