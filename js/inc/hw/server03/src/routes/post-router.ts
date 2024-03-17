import { Router, Request, Response } from "express";
import {
  RequestWithBody,
  RequestWithBodyAndParams,
  RequestWithParams,
  Status,
} from "../types";
import { CreatePostInputModel } from "../models/input/post/create-post-input-model";
import {
  EnchancedPostOutputModel,
  PostOutputModel,
} from "../models/output/post-output-model";
import { BlogRepository } from "../repositories/blog-repository";
import { PostRepository } from "../repositories/post-repository";
import { authMiddleware } from "../middlewares/auth-middleware";
import { PostDbType } from "../models/db/post-db";
import { postValidation } from "../validators/post-validators";
import { inputValidationMiddleware } from "../middlewares/inputValidationMiddleware";
import { Params } from "./blog-router";
import { ObjectId } from "mongodb";
import { UpdatePostInputModel } from "../models/input/post/update-post-input-model";
import { CreateBlogModel } from "../models/input/blog/create-blog-input-model";

export const postRouter = Router();

postRouter.get("/", async (req: Request, res: Response) => {
  const dbPosts = await PostRepository.getAllPosts();
  const dbBlogs = await BlogRepository.getAllBlogs();
  const posts: EnchancedPostOutputModel[] = dbPosts.map((post) => {
    const blog = dbBlogs.find((blog) => blog.id.toString() === post.blogId);
    return {
      ...post,
      blogName: blog ? blog.name : "",
    };
  });
  res.status(Status.Ok_200).json(posts);
});

postRouter.get(
  "/:id",
  async (
    req: RequestWithParams<Params>,
    res: Response<EnchancedPostOutputModel>
  ) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const post = await PostRepository.getPostById(id);
    if (!post) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const blog = await BlogRepository.getBlogById(post.blogId);
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

    const newPost: CreatePostInputModel = {
      title,
      content,
      shortDescription,
      blogId,
    };

    const postId = await PostRepository.createPost(newPost);
    const post = await PostRepository.getPostById(postId);
    if (!post) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const blog = await BlogRepository.getBlogById(blogId);
    const newPostView: EnchancedPostOutputModel = {
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
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const { title, content, shortDescription, blogId } = req.body;

    const updatedPost: UpdatePostInputModel = {
      title,
      content,
      shortDescription,
      blogId,
    };

    await PostRepository.updatePost(id, updatedPost);
    const blog = await BlogRepository.getBlogById(blogId);
    const post = await PostRepository.getPostById(id);

    if (!post) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const newPostView: EnchancedPostOutputModel = {
      ...post,
      blogName: blog ? blog.name : "",
    };

    res.status(Status.NoContent_204).json(newPostView);
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

    const post = await PostRepository.getPostById(id);
    if (!post) {
      res.sendStatus(Status.NotFound_404);
    }

    const isDeleted = await PostRepository.deletePost(req.params.id);
    if (!isDeleted) {
      res.sendStatus(Status.NotFound_404);
      return;
    }
    res.sendStatus(Status.NoContent_204);
  }
);
