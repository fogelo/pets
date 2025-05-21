export type PostOutput = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: Date;
  extendedLikesInfo: {
    likesCount: number;
    dislikesCount: number;
    myStatus: "None" | "Like" | "Dislike";
    newestLikes: {
      addedAt: Date;
      userId: string;
      login: string;
    }[];
  };
};
