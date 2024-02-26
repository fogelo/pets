import express from "express";
import { db } from "./db/db";
import { getCoursesRouter } from "./routes/courses";
import { getTestsRouter } from "./routes/tests";

export const app = express();
app.use(express.json()); // Для разбора JSON тел запросов

const coursesRouter = getCoursesRouter(db);
const testsRouter = getTestsRouter(db);
app.use("/courses", coursesRouter);
app.use("/__test__", testsRouter);
