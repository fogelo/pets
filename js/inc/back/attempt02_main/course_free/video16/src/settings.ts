import express, { Express } from "express";
import { coursesRouter } from "./routes/courses-router";
import { testsRouter } from "./routes/tests-router";

export const app: Express = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.use("/courses", coursesRouter);
app.use("/__tests__", testsRouter);
