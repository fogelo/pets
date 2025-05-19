import { WithId } from "mongodb";
import { Comment } from "../../domain/comment";
import { CommentListPaginatedOutput } from "../output/comment-list-paginated.output";
import { mapToCommentOutput } from "./map-to-comment-output";

export async function mapToCommentListPaginatedOutput(
  comments: WithId<Comment>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number }
): Promise<CommentListPaginatedOutput> {
  // мапим в промисы CommentOutput
  const itemsPromises = comments.map((comment) => {
    return mapToCommentOutput(comment);
  });

  // ждём, пока все промисы разрешатся
  const items = await Promise.all(itemsPromises);
  
  return {
    pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
    page: meta.pageNumber,
    pageSize: meta.pageSize,
    totalCount: meta.totalCount,
    items,
  };
}
