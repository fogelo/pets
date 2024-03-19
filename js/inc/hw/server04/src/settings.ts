import express from "express";
import { blogRouter } from "./routes/blog.router";
import { postRouter } from "./routes/post.router";
import { testRouter } from "./routes/test.router";
export const app = express();

// middlewares
app.use(express.json());

//routers
app.use("/blogs", blogRouter);
app.use("/posts", postRouter);
app.use("/testing", testRouter);
