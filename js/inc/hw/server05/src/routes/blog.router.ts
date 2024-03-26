import { Response, Router } from "express";
import { ObjectId } from "mongodb";
import { authMiddleware } from "../middlewares/auth.middleware";
import { inputValidationMiddleware } from "../middlewares/input.validation.middleware";
import {
  RequestWithBody,
  RequestWithBodyAndParams,
  RequestWithParams,
  RequestWithParamsAndQuery,
  RequestWithQuery,
  Status,
} from "../models/common";
import { PostDbModel } from "../models/db/post.db.model";
import { CreateBlogInputModel } from "../models/input/blog/create.blog.input.model";
import { QueryBlogInputModel } from "../models/input/blog/query.blog.input.model";
import { UpdateBlogInputModel } from "../models/input/blog/update.blog.input.model";
import { CreatePostInputModel } from "../models/input/post/create.post.input.model";
import { QueryPostInputModel } from "../models/input/post/query.post.input.model";
import { BlogOutputModel } from "../models/output/blog.output.model";
import { BlogQueryRepository } from "../repositories/blog.query.repository";
import { BlogRepository } from "../repositories/blog.repository";
import { PostQueryRepository } from "../repositories/post.query.repository";
import { BlogService } from "../services/blog.service";
import { blogValidation } from "../validators/blog.validators";
import { createPostFromBlogValidation } from "../validators/post.validators";

export const blogRouter = Router({});

export type Params = {
  id: string;
};

blogRouter.get(
  "/",
  async (req: RequestWithQuery<QueryBlogInputModel>, res: Response) => {
    const sortData: Required<QueryBlogInputModel> = {
      searchNameTerm: req.query.searchNameTerm ?? null,
      sortBy: req.query.sortBy ?? "createdAt",
      sortDirection: req.query.sortDirection ?? "desc",
      pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
      pageSize: req.query.pageSize ? +req.query.pageSize : 10,
    };

    const blogs = await BlogQueryRepository.getAllBlogs(sortData);
    res.send(blogs);
  }
);

blogRouter.get(
  "/:id/posts",
  async (
    req: RequestWithParamsAndQuery<Params, QueryPostInputModel>,
    res: Response
  ) => {
    const blogId = req.params.id;
    if (!ObjectId.isValid(blogId)) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const blog = await BlogQueryRepository.getBlogById(blogId);
    if (!blog) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const sortData: Required<QueryPostInputModel> = {
      searchNameTerm: req.query.searchNameTerm ?? null,
      sortBy: req.query.sortBy ?? "createdAt",
      sortDirection: req.query.sortDirection ?? "desc",
      pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
      pageSize: req.query.pageSize ? +req.query.pageSize : 10,
    };

    const posts = await PostQueryRepository.getAllPosts(sortData, blogId);
    res.send(posts);
  }
);

blogRouter.get(
  "/:id",
  async (req: RequestWithParams<Params>, res: Response<BlogOutputModel>) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const blog = await BlogQueryRepository.getBlogById(id);
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
    const blog = await BlogQueryRepository.getBlogById(blogId);
    if (!blog) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    res.status(Status.Created_201).json(blog);
  }
);

blogRouter.post(
  "/:id/posts",
  authMiddleware,
  createPostFromBlogValidation(),
  inputValidationMiddleware,
  async (
    req: RequestWithBodyAndParams<Params, CreatePostInputModel>,
    res: Response
  ) => {
    const blogId = req.params.id;
    if (!ObjectId.isValid(blogId)) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const postData: CreatePostInputModel & { createdAt: string } = {
      title: req.body.title,
      content: req.body.content,
      shortDescription: req.body.shortDescription,
      blogId,
      createdAt: new Date().toISOString(),
    };

    const post = await BlogService.createPostToBlog(blogId, postData);
    if (!post) {
      res.sendStatus(Status.NotFound_404);
      return;
    }
    return res.status(Status.Created_201).json(post);
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

    let existingBlog = await BlogQueryRepository.getBlogById(id);
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
    return res.sendStatus(Status.NoContent_204);
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

    const existingBlog = await BlogQueryRepository.getBlogById(id);
    if (!existingBlog) {
      return res.sendStatus(Status.NotFound_404);
    }
    const isDeleted = await BlogRepository.deleteBlog(id);
    if (!isDeleted) {
      res.sendStatus(Status.NotFound_404);
      return;
    }
    return res.sendStatus(Status.NoContent_204);
  }
);
