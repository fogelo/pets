import { ObjectId } from "mongodb";

export type CreatePostInputModel = {
  title: string;
  shortDescription: string;
  content: string;
  blogId?: string;
};
