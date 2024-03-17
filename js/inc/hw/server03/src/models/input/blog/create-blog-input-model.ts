import { BlogDbType } from "../../db/blog-db";

export type CreateBlogModel = Omit<BlogDbType, "_id">;
