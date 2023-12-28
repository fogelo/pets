// import Express from "express";
const express = require("express");
const { sub } = require("date-fns");

const app = express();
//подключение middleware
app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*"); // Разрешить доступ всем источникам
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Разрешить запросы с этого источника
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const jsonBodyMiddleWare = express.json();
app.use(jsonBodyMiddleWare); //появится поле body в стуктуре request

const db = {
  posts: [
    {
      id: "1",
      title: "First Post!",
      content: "Hello!",
      date: sub(new Date(), { minutes: 10 }).toISOString(),
      reactions: {
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
      userId: "1",
    },
    {
      id: "2",
      title: "Second Post",
      content: "More text",
      date: sub(new Date(), { minutes: 15 }).toISOString(),
      reactions: {
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
      userId: "2",
    },
  ],
  users: [
    { id: "0", name: "Tianna Jenkins" },
    { id: "1", name: "Kevin Grant" },
    { id: "2", name: "Madison Price" },
  ],
};

const port = 3000;
app.listen(port, () => {
  console.log("Server is working");
});

// посты
app.get("/posts", (req, res) => {
  let posts = db.posts;
  if (req.query.title) {
    posts = posts.filter((c) => c.title.includes(req.query.title));
  }
  res.json(posts);
});

app.post("/posts", (req, res) => {
  console.log(req.body);
  let newPost = {
    id: +new Date(),
    title: req.body.title,
    content: req.body.content,
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
    userId: req.body.userId,
  };
  db.posts.push(newPost);
  res.json(newPost);
});

// пользователи
app.get("/users", (req, res) => {
  let users = db.users;
  if (req.query.title) {
    users = users.filter((c) => c.title.includes(req.query.title));
  }
  res.json(users);
});
