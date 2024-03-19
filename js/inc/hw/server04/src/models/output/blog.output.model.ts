import { BlogDbModel } from "../db/blog.db.model";

export type BlogOutputModel = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
};
