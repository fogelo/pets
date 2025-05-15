import express from "express";
import { postsService } from "../../application/posts.service";
import { mapToPostOutput } from "../mappers/map-to-post-output";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";

export const getPostHandler = async (
  req: express.Request<{ id: string }>,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const post = await postsService.findByIdOrFail(id);
    const postOutput = mapToPostOutput(post);
    res.status(HttpStatus.Ok).send(postOutput);
    return;
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
