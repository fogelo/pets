import { WithId } from "mongodb";
import { RepositoryNotFoundError } from "../../../core/errors/repository-not-found.error";
import { commentLikesCollection } from "../../../db/db";
import { CommentLike } from "../domain/comment-like";

export const commentLikesRepository = {
  async getLikeCountForComment(queryDto: {
    commentId: string;
    likeStatus?: "None" | "Like" | "Dislike";
  }): Promise<number> {
    const { commentId, likeStatus } = queryDto;
    const filter: any = {};

    if (commentId) {
      filter.commentId = commentId;
    }
    if (likeStatus) {
      filter.likeStatus = likeStatus;
    }

    const totalCount = await commentLikesCollection.countDocuments(filter);

    return totalCount;
  },
  async findByCommentIdAndUserId(
    commentId: string,
    userId?: string
  ): Promise<WithId<CommentLike> | null> {
    const filter: any = {};

    if (commentId) {
      filter.commentId = commentId;
    }
    if (userId) {
      filter.userId = userId;
    }

    const comment = await commentLikesCollection.findOne(filter);
    return comment;
  },
  async create(newCommentLike: CommentLike): Promise<string> {
    const insertResult = await commentLikesCollection.insertOne(newCommentLike);
    return insertResult.insertedId.toString();
  },
  async update(
    commentId: string,
    userId: string,
    dto: {
      likeStatus: "None" | "Like" | "Dislike";
    }
  ): Promise<void> {
    const updateResult = await commentLikesCollection.updateOne(
      {
        commentId,
        userId,
      },
      { $set: dto }
    );
    if (updateResult.matchedCount < 1) {
      throw new RepositoryNotFoundError("CommentLike not exist");
    }

    return;
  },
};
