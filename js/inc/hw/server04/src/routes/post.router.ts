import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { authMiddleware } from "../middlewares/auth.middleware";
import { inputValidationMiddleware } from "../middlewares/input.validation.middleware";
import {
  RequestWithBody,
  RequestWithBodyAndParams,
  RequestWithParams,
  Status,
} from "../models/common";
import { CreatePostInputModel } from "../models/input/post/create.post.input.model";
import { UpdatePostInputModel } from "../models/input/post/update.post.input.model";
import { PostOutputModel } from "../models/output/post.output.model";
import { BlogQueryRepository } from "../repositories/blog.query.repository";
import { PostQueryRepository } from "../repositories/post.query.repository";
import { PostRepository } from "../repositories/post.repository";
import { postValidation } from "../validators/post.validators";
import { Params } from "./blog.router";
import { PostDbModel } from "../models/db/post.db.model";

export const postRouter = Router();

postRouter.get("/", async (req: Request, res: Response) => {
  const posts = await PostQueryRepository.getAllPosts();
  res.status(Status.Ok_200).json(posts);
});

postRouter.get(
  "/:id",
  async (req: RequestWithParams<Params>, res: Response<PostOutputModel>) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const post = await PostQueryRepository.getPostById(id);
    if (!post) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const blog = await BlogQueryRepository.getBlogById(post.blogId);
    const viewPost = { ...post, blogName: blog ? blog.name : "" };
    res.status(Status.Ok_200).json(viewPost);
  }
);

postRouter.post(
  "/",
  authMiddleware,
  postValidation(),
  inputValidationMiddleware,
  async (
    req: RequestWithBody<CreatePostInputModel>,
    res: Response<PostOutputModel>
  ) => {
    const { title, content, shortDescription, blogId } = req.body;

    if (!blogId || !ObjectId.isValid(blogId)) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const blog = await BlogQueryRepository.getBlogById(blogId);

    if (!blog) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const newPost: PostDbModel = {
      title,
      content,
      shortDescription,
      blogId,
      createdAt: new Date().toISOString(),
    };

    const postId = await PostRepository.createPost(newPost);
    const post = await PostQueryRepository.getPostById(postId);
    if (!post) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const newPostView: PostOutputModel = {
      ...post,
      blogName: blog ? blog.name : "",
    };

    res.status(Status.Created_201).json(newPostView);
  }
);

postRouter.put(
  "/:id",
  authMiddleware,
  postValidation(),
  inputValidationMiddleware,
  async (
    req: RequestWithBodyAndParams<{ id: string }, CreatePostInputModel>,
    res: Response<PostOutputModel>
  ) => {
    const postId = req.params.id;

    if (!ObjectId.isValid(postId)) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const { title, content, shortDescription, blogId } = req.body;

    if (!blogId || !ObjectId.isValid(blogId)) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const updatedPost: UpdatePostInputModel = {
      title,
      content,
      shortDescription,
      blogId,
    };

    const blog = await BlogQueryRepository.getBlogById(blogId);

    if (!blog) {
      res.sendStatus(Status.NotFound_404);
      return;
    }
    const post = await PostQueryRepository.getPostById(postId);

    if (!post) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    await PostRepository.updatePost(postId, updatedPost);
    return res.sendStatus(Status.NoContent_204);
  }
);

postRouter.delete(
  "/:id",
  authMiddleware,
  async (req: RequestWithParams<Params>, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const post = await PostQueryRepository.getPostById(id);
    if (!post) {
      return res.sendStatus(Status.NotFound_404);
    }

    const isDeleted = await PostRepository.deletePost(req.params.id);
    if (!isDeleted) {
      res.sendStatus(Status.NotFound_404);
      return;
    }
    return res.sendStatus(Status.NoContent_204);
  }
);
