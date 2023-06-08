const request = require("supertest");
import { app } from "../../src/express-server";

describe("Тестирование endpoint /home`", () => {
  it("Запрос должен вернуть объект с полем message: `Home message`;", async () => {
    await request(app).get("/home").expect(200, {message: "Home page"});
  });
});
