import express from "express";
import { postsService } from "../../application/posts.service";
import { mapToPostOutput } from "../mappers/map-to-post-output";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { blogsService } from "../../../blogs/application/blogs.service";

export const getPostHandler = async (
  req: express.Request<{ id: string }>,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const post = await postsService.findByIdOrFail(id);
    const blog = await blogsService.findByIdOrFail(post.blogId);
    const postOutput = mapToPostOutput(post, blog);
    res.status(HttpStatus.Ok).send(postOutput);
    return;
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
