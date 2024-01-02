"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUSES = exports.app = void 0;
const express = require("express");
exports.app = express();
const port = 3000;
//подключение middleware
const jsonBodyMiddleWare = express.json();
exports.app.use(jsonBodyMiddleWare); //появится поле body в стуктуре request
const db = {
    courses: [
        { id: 1, title: "css" },
        { id: 2, title: "html" },
        { id: 3, title: "js" },
        { id: 4, title: "ts" },
    ],
};
var HTTP_STATUSES;
(function (HTTP_STATUSES) {
    HTTP_STATUSES[HTTP_STATUSES["OK_200"] = 200] = "OK_200";
    HTTP_STATUSES[HTTP_STATUSES["CREATED_201"] = 201] = "CREATED_201";
    HTTP_STATUSES[HTTP_STATUSES["NO_CONTENT_204"] = 204] = "NO_CONTENT_204";
    HTTP_STATUSES[HTTP_STATUSES["BAD_REQUEST_400"] = 400] = "BAD_REQUEST_400";
    HTTP_STATUSES[HTTP_STATUSES["NOT_FOUND_404"] = 404] = "NOT_FOUND_404";
})(HTTP_STATUSES = exports.HTTP_STATUSES || (exports.HTTP_STATUSES = {}));
exports.app.get("/", (req, res) => {
    res.send("Hello world");
});
exports.app.get("/home", (req, res) => {
    res.send({ message: "Home page" });
});
exports.app.get("/number", (req, res) => {
    res.json(1000);
});
exports.app.get("/status", (req, res) => {
    res.sendStatus(500);
});
exports.app.get("/code", (req, res) => {
    res.send(HTTP_STATUSES.NOT_FOUND_404);
});
// курсы
exports.app.get("/courses", (req, res) => {
    let courses = db.courses;
    if (req.query.title) {
        courses = courses.filter((c) => c.title.includes(req.query.title));
    }
    res.json(courses);
});
exports.app.get("/courses/:id", (req, res) => {
    const course = db.courses.find((c) => c.id === +req.params.id);
    if (!course) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
    else {
        res.json(course);
    }
});
exports.app.post("/courses", (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    }
    else {
        const newCourse = {
            id: +new Date(),
            title: req.body.title,
        };
        db.courses.push(newCourse);
        res.status(HTTP_STATUSES.CREATED_201).json(newCourse);
    }
});
exports.app.delete("/courses/:id", (req, res) => {
    db.courses = db.courses.filter((c) => c.id !== +req.params.id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
// Для очиски бд
exports.app.delete("/__test__/data", (req, res) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
exports.app.listen(port, () => {
    console.log("Server is working");
});
