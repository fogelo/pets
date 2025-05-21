import { WithId } from "mongodb";
import { Comment } from "../domain/comment";
import { CommentAttributes } from "./dtos/comment.attributes";
import { commentLikesRepository } from "../repositories/comment-likes.repository";
import { CommentLike } from "../domain/comment-like";

export const commentLikesService = {
  async getLikeCountForComment(queryDto: {
    commentId: string;
    likeStatus?: "None" | "Like" | "Dislike";
  }): Promise<number> {
    const result = commentLikesRepository.getLikeCountForComment(queryDto);
    return result;
  },
  async findByCommentIdAndUserId(
    commentId: string,
    userId?: string
  ): Promise<WithId<CommentLike> | null> {
    return commentLikesRepository.findByCommentIdAndUserId(commentId, userId);
  },
  async create(dto: {
    commentId: string;
    userId: string;
    likeStatus: "None" | "Like" | "Dislike";
  }): Promise<string> {
    const newCommentLike = {
      createdAt: new Date(),
      userId: dto.userId,
      commentId: dto.commentId,
      likeStatus: dto.likeStatus,
    };
    const createdCommentLikeId = commentLikesRepository.create(newCommentLike);
    return createdCommentLikeId;
  },
  async update(
    commentId: string,
    userId: string,
    dto: {
      likeStatus: "None" | "Like" | "Dislike";
    }
  ): Promise<void> {
    await commentLikesRepository.update(commentId, userId, dto);
    return;
  },
};
