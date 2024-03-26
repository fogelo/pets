import { WithId } from "mongodb";
import { BlogDbModel } from "../db/blog.db.model";

export const blogMapper = (
  blog: WithId<BlogDbModel>
): BlogDbModel & { id: string } => {
  return {
    id: blog._id.toString(),
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership,
  };
};
