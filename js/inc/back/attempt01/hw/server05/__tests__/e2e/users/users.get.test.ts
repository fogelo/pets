import request from "supertest";
import {
  getCorrectOutputUserItem,
  getCorrectOutputUsersBody,
} from "../../../__mocks__/correct.data";
import { client } from "../../../src/db/db";
import { Pagination, Status } from "../../../src/models/common";
import { CreateUserInputModel } from "../../../src/models/input/user/create.user.input.model";
import { UserOutputModel } from "../../../src/models/output/user.output.model";
import { app } from "../../../src/settings";

afterAll(async () => {
  await client.close();
});

describe("/users GET", () => {
  beforeAll(async () => {
    await request(app).delete("/testing/all-data").auth("admin", "qwerty");

    const range = [...Array(100).keys()];
    const responses = await Promise.all(
      range.map((value) => {
        const coorectInputUser: CreateUserInputModel = {
          login: `anton${value}`,
          email: `anton${value}@mail.com`,
          password: `123123123${value}`,
        };
        return request(app)
          .post("/users")
          .auth("admin", "qwerty")
          .send(coorectInputUser);
      })
    );
  });

  it("должен вернуть пользователей с дефолтными query параметрами (desc)", async () => {
    const response = await request(app).get("/users");
    const users: Pagination<UserOutputModel> = response.body;
    expect(response.statusCode).toBe(Status.Ok_200);
    expect(users).toEqual(getCorrectOutputUsersBody());

    const isSortedByCreatedAtDesc = users.items.every((item, index, arr) => {
      return (
        index === 0 ||
        new Date(item.createdAt).getTime() <=
          new Date(arr[index - 1].createdAt).getTime()
      );
    });
    expect(isSortedByCreatedAtDesc).toBe(true);
  });

  it("должен вернуть пользователей отфильтрованных по полю login", async () => {
    const response = await request(app).get("/users?searchLoginTerm=1");
    const users: Pagination<UserOutputModel> = response.body;
    expect(response.statusCode).toBe(Status.Ok_200);
    expect(users).toEqual(getCorrectOutputUsersBody());
  });

  it("должен вернуть пользователей с сортировкой по дате создания asc", async () => {
    const response = await request(app).get(
      "/users?sortBy=createdAt&sortDirection=asc"
    );
    const users: Pagination<UserOutputModel> = response.body;
    expect(response.statusCode).toBe(Status.Ok_200);
    expect(users).toEqual(getCorrectOutputUsersBody());

    const isSortedByCreatedAt = users.items.every((item, index, arr) => {
      return (
        index === 0 ||
        new Date(item.createdAt).getTime() >=
          new Date(arr[index - 1].createdAt).getTime()
      );
    });
    expect(isSortedByCreatedAt).toBe(true);
  });

  it("должен вернуть верное кол-во пользователей", async () => {
    const pageNumber = 2;
    const pageSize = 5;
    const response = await request(app).get(
      `/users?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
    const users: Pagination<UserOutputModel> = response.body;
    expect(response.statusCode).toBe(Status.Ok_200);
    expect(users.items.length).toBe(pageSize);
    expect(users.page).toBe(pageNumber);
  });

  it("должен вернуть пользователя по его id", async () => {
    const pageNumber = 1;
    const pageSize = 1;
    const usersResponse = await request(app).get(
      `/users?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
    const users: Pagination<UserOutputModel> = usersResponse.body;
    const userId = users.items[0].id;
    const userResponse = await request(app).get(`/users/${userId}`);
    expect(userResponse.statusCode).toBe(Status.Ok_200);
    expect(userResponse.body).toEqual(getCorrectOutputUserItem());
  });
});
