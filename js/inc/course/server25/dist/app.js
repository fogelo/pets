"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const courses_1 = require("./routes(pl)/courses");
const tests_1 = require("./routes(pl)/tests");
const courses_repository_1 = require("./db_repositories(dal)/courses_repository");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json()); // Для разбора JSON тел запросов
const coursesRouter = (0, courses_1.getCoursesRouter)();
const testsRouter = (0, tests_1.getTestsRouter)(courses_repository_1.db);
exports.app.use("/courses", coursesRouter);
exports.app.use("/__test__", testsRouter);
