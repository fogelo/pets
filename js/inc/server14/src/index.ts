import express, { Request, Response } from "express";
export const app = express();
app.use(express.json()); // Для разбора JSON тел запросов

const port = 3004;

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
};

const db = {
  courses: [
    { id: "1", title: "Заголовок 1" },
    { id: "2", title: "Заголовок 2" },
    { id: "3", title: "Заголовок 3" },
    { id: "4", title: "Заголовок 4" },
    { id: "5", title: "Заголовок 5" },
  ],
};

// get
// можно типизировать Request и Response вот так, но они автоматом тоже подхватываются
app.get("/", (req: Request, res: Response) => {
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
});

app.get("/courses", (req, res) => {
  res.status(HTTP_STATUSES.OK_200);
  res.json(db.courses);
});

app.get("/courses/:id", (req, res) => {
  const course = db.courses.find((course) => course.id === req.params.id);
  if (course) res.json(course);
  else res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
});

// post
app.post("/courses", (req, res) => {
  const title = req.body.title;
  const isTitleCorrect = typeof title === "string";
  if (isTitleCorrect) {
    const newCourse = { id: String(new Date()), title };
    db.courses.push(newCourse);
    res.status(HTTP_STATUSES.CREATED_201);
    res.json(newCourse);
  } else {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
  }
});

// delete
app.delete("/courses/:id", (req, res) => {
  const course = db.courses.find((course) => course.id === req.params.id);
  db.courses = db.courses.filter((course) => course.id !== req.params.id);

  if (course) {
    res.status(HTTP_STATUSES.CREATED_201);
    res.json(course);
  }
});

// put
app.put("/courses/:id", (req, res) => {
  const title = req.body.title;
  if (title) {
    const course = db.courses.find((course) => course.id === req.params.id);
    if (course) {
      course.title = title;
      res.json(course);
    } else {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    }
  } else {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
  }
});

// для тестов
app.delete("/__test__/data", (req, res) => {
  db.courses = [];
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

// запускаем сервер
app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
