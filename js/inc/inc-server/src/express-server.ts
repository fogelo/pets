import Express from "express";
const express = require("express");

export const app = express();
const port = 3000;

//подключение middleware
const jsonBodyMiddleWare = express.json();
app.use(jsonBodyMiddleWare); //появится поле body в стуктуре request

type CourseType = { id: number; title: string };

const db: { courses: CourseType[] } = {
  courses: [
    { id: 1, title: "css" },
    { id: 2, title: "html" },
    { id: 3, title: "js" },
    { id: 4, title: "ts" },
  ],
};

export enum HTTP_STATUSES {
  OK_200 = 200,
  CREATED_201 = 201,
  NO_CONTENT_204 = 204,

  BAD_REQUEST_400 = 400,
  NOT_FOUND_404 = 404,
}

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/home", (req, res) => {
  res.send({ message: "Home page" });
});

app.get("/number", (req, res) => {
  res.json(1000);
});

app.get("/status", (req, res) => {
  res.sendStatus(500);
});

app.get("/code", (req, res) => {
  res.send(HTTP_STATUSES.NOT_FOUND_404);
});

// курсы
app.get(
  "/courses",
  (
    req: Express.Request<{}, {}, {}, { title: string }>,
    res: Express.Response<CourseType[]>
  ) => {
    let courses = db.courses;

    if (req.query.title) {
      courses = courses.filter((c) => c.title.includes(req.query.title));
    }
    res.json(courses);
  }
);

app.get("/courses/:id", (req, res) => {
  const course = db.courses.find((c) => c.id === +req.params.id);
  if (!course) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  } else {
    res.json(course);
  }
});

app.post("/courses", (req, res) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
  } else {
    const newCourse = {
      id: +new Date(),
      title: req.body.title,
    };
    db.courses.push(newCourse);
    res.status(HTTP_STATUSES.CREATED_201).json(newCourse);
  }
});

app.delete("/courses/:id", (req, res) => {
  db.courses = db.courses.filter((c) => c.id !== +req.params.id);
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

// Для очиски бд
app.delete("/__test__/data", (req, res) => {
  db.courses = [];
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.listen(port, () => {
  console.log("Server is working");
});
