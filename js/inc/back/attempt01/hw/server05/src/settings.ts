import express from "express";
import { authRouter } from "./routes/auth.router";
import { blogRouter } from "./routes/blog.router";
import { postRouter } from "./routes/post.router";
import { testRouter } from "./routes/test.router";
import { userRouter } from "./routes/user.router";
export const app = express();

// middlewares
app.use(express.json());

//routers
app.use("/auth", authRouter);
app.use("/blogs", blogRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/testing", testRouter);
