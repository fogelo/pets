import express, { Express } from "express";
import { coursesRouter } from "./features/courses/courses.router";
import { testsRouter } from "./routes/tests.router";
import { usersRouter } from "./features/users/users.router";
import { bindingsRouter } from "./features/users-courses-bindings/users-courses-bindings.router";

export const app: Express = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

export const RouterPaths = {
  courses: "/courses",
  users: "/users",
  __tests__: "/__tests__",
  bindings: "/users-courses-bindings",
};

app.use(RouterPaths.courses, coursesRouter);
app.use(RouterPaths.users, usersRouter);
app.use(RouterPaths.__tests__, testsRouter);
app.use(RouterPaths.bindings, bindingsRouter);
