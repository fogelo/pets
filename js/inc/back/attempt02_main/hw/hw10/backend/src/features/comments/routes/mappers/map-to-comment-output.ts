import { WithId } from "mongodb";
import { Comment } from "../../domain/comment";
import { CommentOutput } from "../output/comment.output";
import { usersService } from "../../../users/domain/users.service";

export const mapToCommentOutput = async (
  comment: WithId<Comment>
): Promise<CommentOutput> => {
  const user = await usersService.findById(comment.userId);
  return {
    id: comment._id.toString(),
    content: comment.content,
    commentatorInfo: {
      userId: user?._id.toString() || null,
      userLogin: user?.accountData.login || null,
    },
    createdAt: comment.createdAt,
  };
};
