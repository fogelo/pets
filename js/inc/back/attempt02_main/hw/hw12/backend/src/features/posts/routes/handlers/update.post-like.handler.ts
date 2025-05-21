import express from "express";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { mapToPostOutput } from "../mappers/map-to-post-output";
import { PostLikeUpdateInput } from "../input/post-like.update.input";
import { postsService } from "../../application/posts.service";
import { postLikesService } from "../../application/post-like.service";

export const updatePostLikeHandler = async (
  req: express.Request<{ id: string }, {}, PostLikeUpdateInput>,
  res: express.Response
) => {
  try {
    const postId = req.params.id;
    const likeStatus = req.body.likeStatus;
    const user = req.user;
    const post = await postsService.findByIdOrFail(postId);

    if (!post) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }

    const postOutput = await mapToPostOutput(post, user?.id);
    const postLike = await postLikesService.findByPostIdAndUserId(
      postOutput.id,
      user?.id!
    );

    if (postLike) {
      await postLikesService.update(postOutput.id, user?.id!, {
        likeStatus,
      });
      res.sendStatus(HttpStatus.NoContent);
      return;
    } else {
      await postLikesService.create({
        postId: postOutput.id,
        userId: user?.id!,
        likeStatus,
      });
      res.sendStatus(HttpStatus.NoContent);
      return;
    }
  } catch (err) {
    errorsHandler(err, res);
  }
};
