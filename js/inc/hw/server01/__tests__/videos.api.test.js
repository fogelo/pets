"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("../src/settings");
const supertest_1 = __importDefault(require("supertest"));
const expectedVideo = {
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
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(settings_1.app).delete("/testing/all-data");
    }));
    it("Видео должно добавиться", () => __awaiter(void 0, void 0, void 0, function* () {
        const newVideo = {
            author: "anton",
            title: "hello",
            availableResolutions: ["P1080", "P144"],
        };
        const response = yield (0, supertest_1.default)(settings_1.app)
            .post("/videos")
            .send(newVideo)
            .expect(settings_1.Status.Created_201);
        const createdVideo = response.body;
        expect(createdVideo).toEqual(expectedVideo);
    }));
    it("Видео должно вернуться", () => __awaiter(void 0, void 0, void 0, function* () {
        const response1 = yield (0, supertest_1.default)(settings_1.app).get("/videos").expect(settings_1.Status.Ok_200);
        const gotVideo = response1.body[0];
        const response2 = yield (0, supertest_1.default)(settings_1.app)
            .get(`/videos/${gotVideo.id}`)
            .expect(settings_1.Status.Ok_200);
        const gotByIdVideo = response2.body;
        expect(gotVideo).toEqual(expectedVideo);
        expect(gotByIdVideo).toEqual(expectedVideo);
    }));
    it("Видео должно обновиться", () => __awaiter(void 0, void 0, void 0, function* () {
        const response1 = yield (0, supertest_1.default)(settings_1.app).get("/videos").expect(settings_1.Status.Ok_200);
        const gotVideo = response1.body[0];
        const videoToUpdate = {
            title: "world",
            author: "mary",
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: "2025-01-09T21:03:43.014Z",
            availableResolutions: ["P144"],
        };
        yield (0, supertest_1.default)(settings_1.app)
            .put(`/videos/${gotVideo.id}`)
            .send(videoToUpdate)
            .expect(settings_1.Status.NoContent_204);
        const response2 = yield (0, supertest_1.default)(settings_1.app)
            .get(`/videos/${gotVideo.id}`)
            .expect(settings_1.Status.Ok_200);
        const updatedVideo = response2.body;
        expect(updatedVideo).toEqual(Object.assign(Object.assign({}, videoToUpdate), { id: gotVideo.id, createdAt: gotVideo.createdAt }));
    }));
    it("Видео должно удалиться", () => __awaiter(void 0, void 0, void 0, function* () {
        const response1 = yield (0, supertest_1.default)(settings_1.app).get("/videos").expect(settings_1.Status.Ok_200);
        const gotVideo = response1.body[0];
        yield (0, supertest_1.default)(settings_1.app).delete(`/videos/${gotVideo.id}`).expect(settings_1.Status.Ok_200);
        yield (0, supertest_1.default)(settings_1.app)
            .get(`/videos/${gotVideo.id}`)
            .expect(settings_1.Status.NotFound_404);
    }));
});
//# sourceMappingURL=videos.api.test.js.map