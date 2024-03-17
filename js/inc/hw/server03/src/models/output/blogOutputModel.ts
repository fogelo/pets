import { BlogDbModel } from "../db/blogDbModel";

export type BlogOutputModel = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
};
