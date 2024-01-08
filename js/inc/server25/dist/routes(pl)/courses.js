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
exports.getCoursesRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const utils_1 = require("../utils");
const courses_repository_1 = require("../db_repositories(dal)/courses_repository");
const inputValidationMiddleware_1 = require("../middlewares/inputValidationMiddleware");
const getCourseViewModel = (dbCourse) => ({
    id: dbCourse.id,
    title: dbCourse.title,
});
const titleValidation = (0, express_validator_1.body)("title")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("title должен быть заполнен");
const getCoursesRouter = () => {
    // создание роута
    const router = express_1.default.Router();
    //конфигурация роутера
    router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const coursesPromise = courses_repository_1.coursesRepository.findCourses();
        const courses = yield coursesPromise;
        res.status(utils_1.HTTP_STATUSES.OK_200);
        res.json(courses.map(getCourseViewModel));
    }));
    router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const course = yield courses_repository_1.coursesRepository.findCourseById(req.params.id);
        if (course)
            res.json({ id: course.id, title: course.title });
        else
            res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    // post
    router.post("/", titleValidation, inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const newCourse = yield courses_repository_1.coursesRepository.createCourse(req.body.title);
        res.status(utils_1.HTTP_STATUSES.CREATED_201);
        res.json({
            id: newCourse.id,
            title: newCourse.title,
        });
    }));
    // delete
    router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const isDeleted = yield courses_repository_1.coursesRepository.deleteCourse(req.params.id);
        if (isDeleted) {
            res.sendStatus(utils_1.HTTP_STATUSES.OK_200);
        }
        else {
            res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_404);
        }
    }));
    // put
    router.put("/:id", titleValidation, inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const isUpdated = yield courses_repository_1.coursesRepository.updateCourse(req.params.id, req.body.title);
        if (isUpdated) {
            const updatedCourse = yield courses_repository_1.coursesRepository.findCourseById(req.params.id);
            if (updatedCourse) {
                res.json({ id: updatedCourse === null || updatedCourse === void 0 ? void 0 : updatedCourse.id, title: updatedCourse === null || updatedCourse === void 0 ? void 0 : updatedCourse.title });
            }
            else {
                res.sendStatus(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
            }
        }
        else {
            res.sendStatus(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
        }
    }));
    return router;
};
exports.getCoursesRouter = getCoursesRouter;
