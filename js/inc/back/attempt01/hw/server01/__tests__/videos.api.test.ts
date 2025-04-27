import {
  CreateVideoType,
  Status,
  UpdateVideoType,
  VideoType,
  app,
} from "../src/settings";
import request from "supertest";

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

    const response = await request(app)
      .post("/videos")
      .send(newVideo)
      .expect(Status.Created_201);

    const createdVideo = response.body;
    expect(createdVideo).toEqual(expectedVideo);
  });

  it("Видео должно вернуться", async () => {
    const response1 = await request(app).get("/videos").expect(Status.Ok_200);
    const gotVideo = response1.body[0];
    const response2 = await request(app)
      .get(`/videos/${gotVideo.id}`)
      .expect(Status.Ok_200);
    const gotByIdVideo = response2.body;
    expect(gotVideo).toEqual(expectedVideo);
    expect(gotByIdVideo).toEqual(expectedVideo);
  });

  it("Видео должно обновиться", async () => {
    const response1 = await request(app).get("/videos").expect(Status.Ok_200);
    const gotVideo: VideoType = response1.body[0];

    const videoToUpdate: UpdateVideoType = {
      title: "world",
      author: "mary",
      canBeDownloaded: true,
      minAgeRestriction: 18,
      publicationDate: "2025-01-09T21:03:43.014Z",
      availableResolutions: ["P144"],
    };

    await request(app)
      .put(`/videos/${gotVideo.id}`)
      .send(videoToUpdate)
      .expect(Status.NoContent_204);

    const response2 = await request(app)
      .get(`/videos/${gotVideo.id}`)
      .expect(Status.Ok_200);

    const updatedVideo = response2.body;

    expect(updatedVideo).toEqual<VideoType>({
      ...videoToUpdate,
      id: gotVideo.id,
      createdAt: gotVideo.createdAt,
    });
  });

  it("Видео должно удалиться", async () => {
    const response1 = await request(app).get("/videos").expect(Status.Ok_200);
    const gotVideo: VideoType = response1.body[0];

    await request(app).delete(`/videos/${gotVideo.id}`).expect(Status.NoContent_204);
    await request(app)
      .get(`/videos/${gotVideo.id}`)
      .expect(Status.NotFound_404);
  });
});
