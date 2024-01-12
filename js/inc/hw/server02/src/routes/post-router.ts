import { Router, Request, Response } from "express";
import {
  PostInputModel,
  PostViewModel,
  RequestWithBody,
  RequestWithParams,
  Status,
} from "../types";
import {
  BlogRepository,
  PostRepository,
} from "../repositories/blog-repository";
import { authMiddleware } from "../middlewares/auth-middleware";
import { IPostDb } from "../db/db";
import { postValidation } from "../validators/post-validators";
import { inputValidationMiddleware } from "../middlewares/inputValidationMiddleware";

export const postRouter = Router();

postRouter.get("/", (req: Request, res: Response) => {});

postRouter.get(
  "/:id",
  (req: RequestWithParams<{ id: string }>, res: Response<PostViewModel>) => {
    const post = PostRepository.getPostById(req.params.id);

    if (!post) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const blog = BlogRepository.getBlogById(post.blogId);
    const viewPost = { ...post, blogName: blog ? blog.name : "" };
    res.status(Status.Ok_200).json(viewPost);
  }
);

postRouter.post(
  "/",
  authMiddleware,
  postValidation(),
  inputValidationMiddleware,
  (req: RequestWithBody<PostInputModel>, res: Response<PostViewModel>) => {
    const { title, content, shortDescription, blogId } = req.body;

    const newPostDb: IPostDb = {
      id: new Date().getTime().toString(),
      title,
      content,
      shortDescription,
      blogId,
    };

    PostRepository.createPost(newPostDb);

    const blog = BlogRepository.getBlogById(blogId);
    const newPostView: PostViewModel = {
      ...newPostDb,
      blogName: blog ? blog.name : "",
    };

    res.status(Status.Created_201).json(newPostView);
  }
);
