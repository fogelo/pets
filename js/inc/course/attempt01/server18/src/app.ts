import express from "express";
import { getCoursesRouter } from "./routes(pl)/courses";
import { getTestsRouter } from "./routes(pl)/tests";
import { db } from "./db_repositories(dal)/courses_repository";

export const app = express();
app.use(express.json()); // Для разбора JSON тел запросов

const coursesRouter = getCoursesRouter();
const testsRouter = getTestsRouter(db);
app.use("/courses", coursesRouter);
app.use("/__test__", testsRouter);
  