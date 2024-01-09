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
const app_1 = require("../../src/app");
const supertest_1 = __importDefault(require("supertest"));
const utils_1 = require("../../src/utils");
// тестируем /courses
describe("/courses", () => {
    // beforeAll - какая-то процедура подготовки нашей БД для проведения тестов, в данном случае очищаем массив с курсами
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).delete("/__test__/data");
    }));
    it("Запрос должен вернуть []", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).get("/courses").expect(utils_1.HTTP_STATUSES.OK_200, []);
    }));
    it("Курс не должен добавиться", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { title: 123 };
        // этот запрос не должен создат курс
        yield (0, supertest_1.default)(app_1.app)
            .post("/courses")
            .send(data)
            .expect(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
        //этот запрос, чтобы убедиться, что курс не создался
        yield (0, supertest_1.default)(app_1.app).get("/courses").expect(utils_1.HTTP_STATUSES.OK_200, []);
    }));
    it("Курс должен корректно добавиться", () => __awaiter(void 0, void 0, void 0, function* () {
        const createData = { title: "Новый курс" };
        //проверяем,что курс создан
        const response = yield (0, supertest_1.default)(app_1.app)
            .post("/courses")
            .send(createData)
            .expect(utils_1.HTTP_STATUSES.CREATED_201);
        //при корректном добавлении должен корректно вернуться, причем id должен быть строкой
        const createdCourse = response.body;
        const gotData = {
            id: expect.any(String),
            title: "Новый курс",
        };
        expect(createdCourse).toEqual(gotData);
        // проверяем добавился ли он корректно в базу данных
        yield (0, supertest_1.default)(app_1.app)
            .get("/courses")
            .expect(utils_1.HTTP_STATUSES.OK_200, [createdCourse]);
    }));
});
