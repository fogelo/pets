import express from "express";
import { BLOGS_PATH, AUTH_PATH, MAIN_PATH, POSTS_PATH, TESTING_PATH, USERS_PATH, COMMENTS_PATH } from "./core/paths/paths";
import { blogsRouter } from "./features/blogs/routes/blogs.route";
import { postsRouter } from "./features/posts/routes/posts.route";
import { usersRouter } from "./features/users/routes/users.route";
import { testingRouter } from "./features/testing/routes/testing.route";
import { authRouter } from "./features/auth/routes/login.route";
import { commentsRouter } from "./features/comments/routes/comments.route";

export const setApp = (app: express.Express) => {
  app.use(express.json());

  app.use(USERS_PATH, usersRouter);
  app.use(BLOGS_PATH, blogsRouter);
  app.use(POSTS_PATH, postsRouter);
  app.use(COMMENTS_PATH, commentsRouter);
  app.use(AUTH_PATH, authRouter);
  app.use(TESTING_PATH, testingRouter);

  app.get(`${MAIN_PATH}`, (req: express.Request, res: express.Response) => {
    res.send("Hello World1!");
  });
};
