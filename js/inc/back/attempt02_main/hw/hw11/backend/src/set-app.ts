import express from "express";
import {
  BLOGS_PATH,
  AUTH_PATH,
  MAIN_PATH,
  POSTS_PATH,
  TESTING_PATH,
  USERS_PATH,
  COMMENTS_PATH,
  EMAIL_PATH,
  DEVICES_PATH,
} from "./core/paths/paths";
import { blogsRouter } from "./features/blogs/routes/blogs.route";
import { postsRouter } from "./features/posts/routes/posts.route";
import { usersRouter } from "./features/users/routes/users.route";
import { testingRouter } from "./features/testing/routes/testing.route";
import { authRouter } from "./features/auth/routes/auth.route";
import { commentsRouter } from "./features/comments/routes/comments.route";
import { emailRouter } from "./features/email/routes/email.route";
import cookieParser from "cookie-parser";
import { requestLogMiddleware } from "./core/middlewares/request-logs-middleware";
import { devicesRouter } from "./features/auth/routes/devices.route";
import cors from "cors";

export const setApp = (app: express.Express) => {
  app.use(express.json());
  app.use(cookieParser());

  // Для получения корректного ip-адреса из req.ip
  app.set("trust proxy", true);
  // мидлвара для логирования запросов
  app.use(requestLogMiddleware);

  app.use(
    cors({
      origin: "http://localhost:5173", // адрес вашего фронтенда
      credentials: true,
    })
  );

  app.use(USERS_PATH, usersRouter);
  app.use(BLOGS_PATH, blogsRouter);
  app.use(POSTS_PATH, postsRouter);
  app.use(COMMENTS_PATH, commentsRouter);
  app.use(AUTH_PATH, authRouter);
  app.use(EMAIL_PATH, emailRouter);
  app.use(DEVICES_PATH, devicesRouter);
  app.use(TESTING_PATH, testingRouter);

  app.get(`${MAIN_PATH}`, (req: express.Request, res: express.Response) => {
    res.send("Hello World1!");
  });
};
