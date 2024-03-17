import { BlogDbModel } from "../db/blogDbModel";
import { BlogOutputModel } from "../output/blogOutputModel";

export const blogMapper = (
  blog: BlogDbModel
): Omit<BlogDbModel, "_id"> & { id: string } => {
  return {
    id: blog._id.toString(),
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership,
  };
};
