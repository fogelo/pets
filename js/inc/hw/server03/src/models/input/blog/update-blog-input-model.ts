import { BlogDbType } from "../../db/blog-db";

export type UpdateBlogModel = Omit<BlogDbType, "_id">;
