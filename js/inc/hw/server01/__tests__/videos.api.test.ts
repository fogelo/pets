import { CreateVideoType, Status, VideoType, app } from "../src/settings";
import request from "supertest";

// тестируем /courses
describe("/videos", () => {
  beforeAll(async () => {
    await request(app).delete("/testing/all-data");
  });

  it("Видео должно добавиться", async () => {
    const newVideo: CreateVideoType = {
      author: "anton",
      title: "hello",
      availableResolutions: ["P1080", "P144"],
    };

    const expectedVideo: VideoType = {
      id: expect.any(Number),
      title: "hello",
      author: "anton",
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: expect.any(String),
      publicationDate: expect.any(String),
      availableResolutions: ["P1080", "P144"],
    };

    const response = await request(app)
      .post("/videos")
      .send(newVideo)
      .expect(Status.Created_201);

    const createdVideo = response.body;

    expect(createdVideo).toEqual(expectedVideo);
  });

  // it("Запрос должен вернуть []", async () => {
  //   await request(app).get("/videos").expect(200, []);
  // });
});
