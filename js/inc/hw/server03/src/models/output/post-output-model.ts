import { PostDbType } from "../db/post-db";

export type PostOutputModel = Omit<PostDbType, "_id"> & {
  id: string;
};

export type EnchancedPostOutputModel = PostOutputModel & {
  blogName: string;
};
