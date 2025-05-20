export type CommentOutput = {
  id: string;
  content: string;
  commentatorInfo: {
    userId: string | null;
    userLogin: string | null;
  };
  createdAt: Date;
  likesInfo: {
    likesCount: number;
    dislikesCount: number;
    myStatus: "None" | "Like" | "Dislike";
  };
};
