export type CommentLike = {
  userId: string;
  commentId: string;
  likeStatus: "None" | "Like" | "Dislike";
  createdAt: Date;
};
