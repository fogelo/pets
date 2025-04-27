import request from "supertest";
import { client } from "../../../src/db/db";
import { app } from "../../../src/settings";
import {
  correctInputUserData,
  userIncorrectInputTestCases,
} from "../../../__mocks__/user.test.data";
import { IError, Status } from "../../../src/models/common";

afterAll(async () => {
  await client.close();
});

describe("/users POST", () => {
  beforeAll(async () => {
    await request(app).delete("/testing/all-data").auth("admin", "qwerty");
  });

  it("should be auth error", async () => {
    await request(app)
      .post("/users")
      .send(correctInputUserData)
      .expect(Status.Unauthorized_401);
  });

  userIncorrectInputTestCases.forEach(([field, value, message]) => {
    it(message, async () => {
      const testData = { ...correctInputUserData, [field]: value };
      const response = await request(app)
        .post("/users")
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

  it("the blog must be created", async () => {
    await request(app)
      .post("/users")
      .auth("admin", "qwerty")
      .send(correctInputUserData)
      .expect(Status.Created_201);
  });
});
