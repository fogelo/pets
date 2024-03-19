import { WithId } from "mongodb";
import { BlogDbModel } from "../db/blog.db.model";
import { BlogOutputModel } from "../output/blog.output.model";

export const blogMapper = (
  blog: WithId<BlogDbModel>
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
