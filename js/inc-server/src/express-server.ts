const express = require("express");

export const app = express();
const port = 3000;

//подключение middleware
const jsonBodyMiddleWare = express.json();
app.use(jsonBodyMiddleWare); //появится поле body в стуктуре request

const db = {
  courses: [
    { id: 1, title: "css" },
    { id: 2, title: "html" },
    { id: 3, title: "js" },
    { id: 4, title: "ts" },
  ],
};
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
  res.send(404);
});

// курсы
app.get("/courses", (req, res) => {
  let courses = db.courses;

  if (req.query.title) {
    courses = courses.filter((c) => c.title.includes(req.query.title));
  }
  res.json(courses);
});

app.get("/courses/:id", (req, res) => {
  const course = db.courses.find((c) => c.id === +req.params.id);
  if (!course) {
    res.sendStatus(404);
  } else {
    res.json(course);
  }
});

app.post("/courses", (req, res) => {
  const newCourse = {
    id: +new Date(),
    title: req.body.title || "unknown",
  };
  db.courses.push(newCourse);
  res.status(201).json(newCourse);
});

app.delete("/courses/:id", (req, res) => {
  db.courses = db.courses.filter((c) => c.id !== +req.params.id);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log("Server is working");
});

