export type PostLike = {
  userId: string;
  postId: string;
  likeStatus: "None" | "Like" | "Dislike";
  createdAt: Date;
};
