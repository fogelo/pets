import { ObjectId } from "mongodb";

export interface PostDbModel {
  title: string;
  shortDescription: string;
  content: string;
  blogId: ObjectId;
  createdAt: string;
}
