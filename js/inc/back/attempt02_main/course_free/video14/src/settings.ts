import { db } from "./db";
import { HTTP_STATUSES } from "./http_statuses";
import express, { Express } from "express";

export const app: Express = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/courses", (req, res) => {
  const title = req.query.title as string;
  if (title) {
    const filteredCourses = db.courses.filter((course) =>
      course.title.includes(title)
    );
    res.json(filteredCourses);
    return;
  } else {
    res.json(db.courses);
    return;
  }
});

app.get("/courses/:id", (req, res) => {
  const course = db.courses.find((course) => course.id === +req.params.id);
  if (!course) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  } else {
    res.json(course);
    return;
  }
});

app.post("/courses", (req, res) => {
  const newCourse = {
    id: +new Date(),
    title: req.body.title || "unknown",
  };

  db.courses.push(newCourse);
  res.status(201).json();
});

app.put("/courses/:id", (req, res) => {
  const id = +req.params.id;
  const course = db.courses.find((course) => course.id === id);
  const title = req.body.title;

  if (!course) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  if (!title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  course.title = title;
  res.sendStatus(HTTP_STATUSES.OK_200);
});

app.delete("/courses/:id", (req, res) => {
  const id = +req.params.id;
  const index = db.courses.findIndex((course) => course.id === id);
  if (index === -1) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  } else {
    db.courses.splice(index, 1);
    res.sendStatus(HTTP_STATUSES.OK_200);
    return;
  }
});
