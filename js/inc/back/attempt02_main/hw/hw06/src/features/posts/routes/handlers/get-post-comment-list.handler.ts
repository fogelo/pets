import express from "express";
import { PostQueryInput } from "../input/post-query.input";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { setDefaultSortAndPaginationIfNotExist } from "../../../../core/helpers/set-default-sort-and-pagination";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { commentsService } from "../../../comments/application/comment.service";
import { mapToCommentListPaginatedOutput } from "../../../comments/routes/mappers/map-to-comments-list-paginated-output";
import { postsService } from "../../application/posts.service";

export const getPostCommentListHandler = async (
  req: express.Request<{ id: string }, {}, {}, PostQueryInput>,
  res: express.Response
) => {
  try {
    const postId = req.params.id;
    const post = await postsService.findById(postId);
    if (!post) {
      res.sendStatus(HttpStatus.NotFound);
    }
    const queryInput = setDefaultSortAndPaginationIfNotExist(req.query);
    const { items: comments, totalCount } = await commentsService.findMany({
      ...queryInput,
      postId,
    });

    const commentsListOutput = await mapToCommentListPaginatedOutput(comments, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });
    res.status(HttpStatus.Ok).json(commentsListOutput);
    return;
  } catch (err: unknown) {
    errorsHandler(err, res);
  }
};
