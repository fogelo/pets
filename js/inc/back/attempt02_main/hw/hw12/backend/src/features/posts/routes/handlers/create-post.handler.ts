import express from "express";
import { PostCreateInput } from "../input/post-create.input";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { postsService } from "../../application/posts.service";
import { mapToPostOutput } from "../mappers/map-to-post-output";

export const createPostHandler = async (
  req: express.Request<{}, {}, PostCreateInput>,
  res: express.Response
) => {
  try {
    const body = req.body;
    const createdPostId = await postsService.create(body);
    const createdPost = await postsService.findByIdOrFail(createdPostId);
    const postOutput = await mapToPostOutput(createdPost);

    res.status(HttpStatus.Created).json(postOutput);
    return;
  } catch (err) {
    errorsHandler(err, res);
  }
};
