import { Router } from "express";
import { createPostHandler } from "./handlers/create-post.handler";
import { deletePostHandler } from "./handlers/delete-post.handler";
import { getPostListHandler } from "./handlers/get-post-list-handler";
import { getPostHandler } from "./handlers/get-post.handler";
import { updatePostHandler } from "./handlers/update-post.handler";

export const postsRouter: Router = Router({});

postsRouter
  .get("", getPostListHandler)
  .get("/:id", getPostHandler)
  .post("", createPostHandler)
  .put("/:id", updatePostHandler)
  .delete("/:id", deletePostHandler);
