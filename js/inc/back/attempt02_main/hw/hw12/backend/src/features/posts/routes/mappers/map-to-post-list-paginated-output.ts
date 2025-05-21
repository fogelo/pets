import { WithId } from "mongodb";
import { Post } from "../../domain/post";
import { PostListPaginatedOutput } from "../output/post-list-paginated.output";
import { mapToPostOutput } from "./map-to-post-output";

export async function mapToPostListPaginatedOutput(
  currentUserId: string | null | undefined,
  posts: WithId<Post & { blogName: string }>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number }
): Promise<PostListPaginatedOutput> {
  let itemsPromises;
  if (currentUserId) {
    itemsPromises = posts.map((post) => {
      return mapToPostOutput(post, currentUserId);
    });
  } else {
    itemsPromises = posts.map((post) => {
      return mapToPostOutput(post);
    });
  }

  // ждём, пока все промисы разрешатся
  const items = await Promise.all(itemsPromises);
  return {
    pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
    page: meta.pageNumber,
    pageSize: meta.pageSize,
    totalCount: meta.totalCount,
    items: items,
  };
}
