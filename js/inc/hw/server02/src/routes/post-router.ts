import { Router, Request, Response } from "express";
import {
  IPostInputModel,
  IPostViewModel,
  RequestWithBody,
  RequestWithBodyAndParams,
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

postRouter.get("/", (req: Request, res: Response) => {
  const dbPosts = PostRepository.getAllPosts();
  const dbBlogs = BlogRepository.getAllBlogs();
  const posts: IPostViewModel[] = dbPosts.map((post) => {
    const blog = dbBlogs.find((blog) => blog.id === post.blogId);
    return {
      ...post,
      blogName: blog ? blog.name : "",
    };
  });
  res.status(Status.Ok_200).json(posts);
});

postRouter.get(
  "/:id",
  (req: RequestWithParams<{ id: string }>, res: Response<IPostViewModel>) => {
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
  (req: RequestWithBody<IPostInputModel>, res: Response<IPostViewModel>) => {
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
    const newPostView: IPostViewModel = {
      ...newPostDb,
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
  (
    req: RequestWithBodyAndParams<{ id: string }, IPostInputModel>,
    res: Response<IPostViewModel>
  ) => {
    const { title, content, shortDescription, blogId } = req.body;

    const updatedPost: IPostInputModel = {
      title,
      content,
      shortDescription,
      blogId,
    };

    PostRepository.updatePost(req.params.id, updatedPost);

    const blog = BlogRepository.getBlogById(blogId);
    const post = PostRepository.getPostById(req.params.id);

    if (!post) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const newPostView: IPostViewModel = {
      ...post,
      blogName: blog ? blog.name : "",
    };

    res.status(Status.Created_201).json(newPostView);
  }
);

postRouter.delete(
  "/:id",
  authMiddleware,
  (req: RequestWithParams<{ id: string }>, res) => {
    const post = PostRepository.getPostById(req.params.id);
    if (!post) {
      res.sendStatus(Status.NotFound_404);
    }

    PostRepository.deletePost(req.params.id);
    res.sendStatus(Status.NoContent_204);
  }
);
