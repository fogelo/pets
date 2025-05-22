import express from "express";
import { postsService } from "../../../posts/application/posts.service";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { PostCreateInput } from "../../../posts/routes/input/post-create.input";
import { mapToPostOutput } from "../../../posts/routes/mappers/map-to-post-output";
import { errorsHandler } from "../../../../core/errors/errors.handler";

export const createBlogPostHandler = async (
  req: express.Request<{ id: string }, {}, PostCreateInput>,
  res: express.Response
) => {
  try {
    const blogId = req.params.id;
    const body = req.body;
    const dto = { ...body, blogId };
    const createdPostId = await postsService.create(dto);
    const createdPost = await postsService.findByIdOrFail(createdPostId);
    const postOutput = await mapToPostOutput(createdPost);
    res.status(HttpStatus.Created).json(postOutput);
    return;
  } catch (err) {
    errorsHandler(err, res);
  }
};
