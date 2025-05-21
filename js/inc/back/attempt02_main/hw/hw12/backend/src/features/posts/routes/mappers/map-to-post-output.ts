import { WithId } from "mongodb";
import { postLikesService } from "../../application/post-like.service";
import { Post } from "../../domain/post";
import { PostOutput } from "../output/post.output";
import { usersService } from "../../../users/domain/users.service";

export const mapToPostOutput = async (
  post: WithId<Post & { blogName: string }>,
  currentUserId?: string
): Promise<PostOutput> => {
  // const user = await usersService.findById(post.blogId);
  const postLikesCount = await postLikesService.getLikeCountForPost({
    postId: post._id.toString(),
    likeStatus: "Like",
  });
  const postDislikesCount = await postLikesService.getLikeCountForPost({
    postId: post._id.toString(),
    likeStatus: "Dislike",
  });

  let currentUserLikeStatus = null;

  if (currentUserId) {
    currentUserLikeStatus = await postLikesService.findByPostIdAndUserId(
      post._id.toString(),
      currentUserId
    );
  }

  const myStatus = currentUserLikeStatus
    ? currentUserLikeStatus.likeStatus
    : "None";

  const newestLikes = await postLikesService.findSomeLatestPostLikesByPostId(
    post._id.toString(),
    3
  );
  const newestLikesOutput = await Promise.all(
    newestLikes.map(async (like) => {
      const user = await usersService.findById(like.userId);
      return {
        addedAt: like.createdAt,
        userId: user?._id.toString(),
        login: user?.accountData.login,
      } as {
        addedAt: Date;
        userId: string;
        login: string;
      };
    })
  );

  return {
    id: post._id.toString(),
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId.toString(),
    blogName: post.blogName,
    createdAt: post.createdAt,
    extendedLikesInfo: {
      dislikesCount: postDislikesCount,
      likesCount: postLikesCount,
      myStatus: myStatus,
      newestLikes: newestLikesOutput,
    },
  };
};
