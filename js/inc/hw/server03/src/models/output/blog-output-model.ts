import { BlogDbType } from "../db/blog-db";

export type BlogOutputModel = Omit<BlogDbType, "_id"> & { id: string };
