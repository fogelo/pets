import express from "express";
import { blogRouter } from "./routes/blogRouter";
import { postRouter } from "./routes/postRouter";
import { testRouter } from "./routes/test-router";
export const app = express();

// middlewares
app.use(express.json());

//routers
app.use("/blogs", blogRouter);
app.use("/posts", postRouter);
app.use("/testing", testRouter);
