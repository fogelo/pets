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
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRepository = exports.db = void 0;
const db_1 = require("./db");
exports.db = {
    courses: [
        { id: "1", title: "Заголовок 1", studentCount: 10 },
        { id: "2", title: "Заголовок 2", studentCount: 10 },
        { id: "3", title: "Заголовок 3", studentCount: 10 },
        { id: "4", title: "Заголовок 4", studentCount: 10 },
        { id: "5", title: "Заголовок 5", studentCount: 10 },
    ],
};
exports.coursesRepository = {
    findCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = db_1.coursesCollection.find({}).toArray();
            return courses;
        });
    },
    findCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundCourse = yield db_1.coursesCollection.findOne({ id });
            return foundCourse;
        });
    },
    createCourse(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCourse = {
                id: new Date().toString(),
                title,
                studentCount: 0,
            };
            const result = yield db_1.coursesCollection.insertOne(newCourse);
            return newCourse;
        });
    },
    updateCourse(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.coursesCollection.updateOne({ id }, { $set: { title } });
            return result.matchedCount === 1;
        });
    },
    deleteCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.coursesCollection.deleteOne({ id });
            return result.deletedCount === 1;
        });
    },
};
