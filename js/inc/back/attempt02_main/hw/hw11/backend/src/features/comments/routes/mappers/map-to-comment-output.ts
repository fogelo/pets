import { WithId } from "mongodb";
import { Comment } from "../../domain/comment";
import { CommentOutput } from "../output/comment.output";
import { usersService } from "../../../users/domain/users.service";
import { commentLikesService } from "../../application/comment-like.service";

export const mapToCommentOutput = async (
  comment: WithId<Comment>,
  currentUserId?: string
): Promise<CommentOutput> => {
  const user = await usersService.findById(comment.userId);
  const commentLikesCount = await commentLikesService.getLikeCountForComment({
    commentId: comment._id.toString(),
    likeStatus: "Like",
  });
  const commentDislikesCount = await commentLikesService.getLikeCountForComment(
    {
      commentId: comment._id.toString(),
      likeStatus: "Dislike",
    }
  );

  let currentUserLikeStatus = null;

  if (currentUserId) {
    currentUserLikeStatus = await commentLikesService.findByCommentIdAndUserId(
      comment._id.toString(),
      currentUserId
    );
  }

  const myStatus = currentUserLikeStatus
    ? currentUserLikeStatus.likeStatus
    : "None";

  return {
    id: comment._id.toString(),
    content: comment.content,
    commentatorInfo: {
      userId: user?._id.toString() || null,
      userLogin: user?.accountData.login || null,
    },
    createdAt: comment.createdAt,
    likesInfo: {
      likesCount: commentLikesCount,
      dislikesCount: commentDislikesCount,
      myStatus,
    },
  };
};
