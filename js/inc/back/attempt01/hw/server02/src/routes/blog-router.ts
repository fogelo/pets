import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { IBlogDb, db } from "../db/db";
import { blogValidation } from "../validators/blog-validators";
import { inputValidationMiddleware } from "../middlewares/inputValidationMiddleware";
import { Status } from "../types";
import { BlogRepository } from "../repositories/blog-repository";
import {
  RequestWithParams,
  RequestWithBody,
  RequestWithBodyAndParams,
} from "../types";

export const blogRouter = Router({});

type Params = {
  id: string;
};

type CreateBlogType = {
  name: string;
  description: string;
  websiteUrl: string;
};

blogRouter.get("/", (req: Request, res: Response) => {
  const blogs = BlogRepository.getAllBlogs();
  res.send(blogs);
});

blogRouter.get(
  "/:id",
  (req: RequestWithParams<Params>, res: Response<IBlogDb>) => {
    const blog = BlogRepository.getBlogById(req.params.id);
    if (blog) {
      res.status(Status.Ok_200).json(blog);
    } else {
      res.sendStatus(Status.NotFound_404);
    }
  }
);

blogRouter.post(
  "/",
  authMiddleware,
  blogValidation(),
  inputValidationMiddleware,
  (req: RequestWithBody<CreateBlogType>, res: Response) => {
    const { name, description, websiteUrl } = req.body;

    const newBlog = {
      id: new Date().getTime().toString(),
      name,
      description,
      websiteUrl,
    };

    BlogRepository.createBlog(newBlog);
    res.status(Status.Created_201).json(newBlog);
  }
);

blogRouter.put(
  "/:id",
  authMiddleware,
  blogValidation(),
  inputValidationMiddleware,
  (
    req: RequestWithBodyAndParams<{ id: string }, CreateBlogType>,
    res: Response
  ) => {
    let existingBlog = db.blogs.find((blog) => blog.id === req.params.id);

    if (!existingBlog) {
      res.sendStatus(Status.NotFound_404);
      return;
    }
    const { name, description, websiteUrl } = req.body;
    BlogRepository.updateBlog({
      id: req.params.id,
      name,
      description,
      websiteUrl,
    });
    res.sendStatus(Status.NoContent_204);
  }
);

blogRouter.delete(
  "/:id",
  authMiddleware,
  (req: RequestWithParams<Params>, res: Response) => {
    const existingBlog = BlogRepository.getBlogById(req.params.id);
    if (!existingBlog) {
      res.sendStatus(Status.NotFound_404);
    }
    BlogRepository.deleteBlog(req.params.id);
    res.sendStatus(Status.NoContent_204);
  }
);
