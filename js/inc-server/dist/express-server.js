"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
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
    res.send(404);
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
        res.sendStatus(404);
    }
    else {
        res.json(course);
    }
});
exports.app.post("/courses", (req, res) => {
    const newCourse = {
        id: +new Date(),
        title: req.body.title || "unknown",
    };
    db.courses.push(newCourse);
    res.status(201).json(newCourse);
});
exports.app.delete("/courses/:id", (req, res) => {
    db.courses = db.courses.filter((c) => c.id !== +req.params.id);
    res.sendStatus(204);
});
exports.app.listen(port, () => {
    console.log("Server is working");
});
