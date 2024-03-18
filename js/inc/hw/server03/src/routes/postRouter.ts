import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { authMiddleware } from "../middlewares/authMiddleware";
import { inputValidationMiddleware } from "../middlewares/inputValidationMiddleware";
import { CreatePostInputModel } from "../models/input/post/createPostInputModel";
import { UpdatePostInputModel } from "../models/input/post/updatePostInputModel";
import { BlogRepository } from "../repositories/blogRepository";
import { PostRepository } from "../repositories/postRepository";
import {
  RequestWithBody,
  RequestWithBodyAndParams,
  RequestWithParams,
  Status,
} from "../types";
import { postValidation } from "../validators/postValidators";
import { Params } from "./blogRouter";
import { PostOutputModel } from "../models/output/postOutputModel";

export const postRouter = Router();

postRouter.get("/", async (req: Request, res: Response) => {
  const dbPosts = await PostRepository.getAllPosts();
  const dbBlogs = await BlogRepository.getAllBlogs();
  const posts: PostOutputModel[] = dbPosts.map((post) => {
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
  async (req: RequestWithParams<Params>, res: Response<PostOutputModel>) => {
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

    const newPost: CreatePostInputModel & { createdAt: string } = {
      title,
      content,
      shortDescription,
      blogId,
      createdAt: new Date().toISOString(),
    };

    const postId = await PostRepository.createPost(newPost);

    const post = await PostRepository.getPostById(postId);
    const blog = await BlogRepository.getBlogById(blogId);

    if (!post || !blog) {
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

    const blog = await BlogRepository.getBlogById(blogId);

    if (!blog) {
      res.sendStatus(Status.NotFound_404);
      return;
    }
    const post = await PostRepository.getPostById(id);

    if (!post) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    await PostRepository.updatePost(id, updatedPost);
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

    const post = await PostRepository.getPostById(id);
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
