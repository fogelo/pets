import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { blogValidation } from "../validators/blogValidators";
import { inputValidationMiddleware } from "../middlewares/inputValidationMiddleware";
import { Status } from "../types";
import { BlogRepository } from "../repositories/blogRepository";
import {
  RequestWithParams,
  RequestWithBody,
  RequestWithBodyAndParams,
} from "../types";
import { BlogOutputModel } from "../models/output/blogOutputModel";
import { ObjectId } from "mongodb";
import { CreateBlogInputModel } from "../models/input/blog/createBlogInputModel";
import { UpdateBlogInputModel } from "../models/input/blog/updateBlogInputModel";

export const blogRouter = Router({});

export type Params = {
  id: string;
};

blogRouter.get("/", async (req: Request, res: Response) => {
  const blogs = await BlogRepository.getAllBlogs();
  res.send(blogs);
});

blogRouter.get(
  "/:id",
  async (req: RequestWithParams<Params>, res: Response<BlogOutputModel>) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const blog = await BlogRepository.getBlogById(id);
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
  async (req: RequestWithBody<CreateBlogInputModel>, res: Response) => {
    const { name, description, websiteUrl, isMembership } = req.body;

    const blogData: CreateBlogInputModel & { createdAt: string } = {
      name,
      description,
      websiteUrl,
      isMembership: isMembership ?? false,
      createdAt: new Date().toISOString(),
    };

    const blogId = await BlogRepository.createBlog(blogData);
    const blog = await BlogRepository.getBlogById(blogId);
    if (!blog) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    res.status(Status.Created_201).json(blog);
  }
);

blogRouter.put(
  "/:id",
  authMiddleware,
  blogValidation(),
  inputValidationMiddleware,
  async (
    req: RequestWithBodyAndParams<Params, UpdateBlogInputModel>,
    res: Response
  ) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    let existingBlog = await BlogRepository.getBlogById(id);
    if (!existingBlog) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const { name, description, websiteUrl, isMembership } = req.body;
    const blogData: UpdateBlogInputModel = {
      name,
      description,
      websiteUrl,
      isMembership,
    };
    await BlogRepository.updateBlog(id, blogData);
    res.sendStatus(Status.NoContent_204);
  }
);

blogRouter.delete(
  "/:id",
  authMiddleware,
  async (req: RequestWithParams<Params>, res: Response) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const existingBlog = await BlogRepository.getBlogById(id);
    if (!existingBlog) {
      res.sendStatus(Status.NotFound_404);
    }
    const isDeleted = await BlogRepository.deleteBlog(id);
    if (!isDeleted) {
      res.sendStatus(Status.NotFound_404);
      return;
    }
    res.sendStatus(Status.NoContent_204);
  }
);
