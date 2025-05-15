export type CommentOutput = {
  id: string;
  content: string;
  commentatorInfo: {
    userId: string | null;
    userLogin: string | null;
  };
  createdAt: Date;
};
