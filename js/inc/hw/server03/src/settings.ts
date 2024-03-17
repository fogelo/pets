import express from "express";
import { blogRouter } from "./routes/blogRouter";
import { testRouter } from "./routes/testRouter";
import { postRouter } from "./routes/postRouter";
export const app = express();

// middlewares
app.use(express.json());

//routers
app.use("/blogs", blogRouter);
app.use("/posts", postRouter);
app.use("/testing", testRouter);
