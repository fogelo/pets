// import Express from "express";
const express = require("express");
const { sub } = require("date-fns");
var cors = require("cors");

const app = express();
//подключение middleware
// app.use((req, res, next) => {
//   // res.header("Access-Control-Allow-Origin", "*"); // Разрешить доступ всем источникам
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Разрешить запросы с этого источника
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   next();
// });
app.use(cors());

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
  notifications: [
    {
      id: new Date().getTime(),
      message: "hello",
      date: new Date(),
      userId: "1",
      isNew: true,
      read: false,
    },
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

app.get("/posts/:id", (req, res) => {
  let posts = db.posts;
  const post = posts.find((post) => post.id === req.params.id);
  res.json(post);
});

app.post("/posts", (req, res) => {
  let newPost = {
    id: new Date().getTime().toString(),
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

app.patch("/posts/:id", (req, res) => {
  db.posts = db.posts.map((post) =>
    post.id === req.params.id ? { ...post, ...req.body } : post
  );
  res.sendStatus(200);
});

app.post("/posts/:id/reactions", (req, res) => {
  console.log(req.body);
  const reactionName = req.body.reactionName;
  db.posts = db.posts.map((post) =>
    post.id === req.params.id
      ? {
          ...post,
          reactions: {
            ...post.reactions,
            [reactionName]: post.reactions[reactionName] + 1,
          },
        }
      : post
  );
  res.sendStatus(200);
});

// пользователи
app.get("/users", (req, res) => {
  let users = db.users;
  if (req.query.title) {
    users = users.filter((c) => c.title.includes(req.query.title));
  }
  res.json(users);
});
app.get("/notifications", (req, res) => {
  let notifications;
  if (req.query.since) {
    notifications = db.notifications.filter(
      (notification) => new Date(notification.date) > new Date(req.query.since)
    );
  } else {
    notifications = db.notifications;
  }
  res.json(notifications);
});

setInterval(() => {
  db.notifications.push({
    id: new Date().getTime(),
    message: "hello" + new Date(),
    date: new Date(),
    userId: "1",
    isNew: true,
    read: false,
  });
}, 10000);
