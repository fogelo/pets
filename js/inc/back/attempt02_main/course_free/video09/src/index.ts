import express from "express";

const app = express();
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

const port = 3001;

const HTTP_STATUSES = {
  OK_200: 200,
  NOT_FOUND_404: 404,
  BAD_REQUEST_400: 400,
};

const db = {
  courses: [
    { id: 1, title: "front-end" },
    { id: 2, title: "back-end" },
    { id: 3, title: "devops" },
    { id: 4, title: "qa" },
  ],
};

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

app.listen(port, () => {
  console.log(`Сервер запущен на порту: ${port}`);
});
