import { BlogDbType } from "../db/blog-db";
import { BlogOutputModel } from "../output/blog-output-model";

export const blogMapper = (blog: BlogDbType): BlogOutputModel => {
  return {
    id: blog._id.toString(),
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
  };
};
