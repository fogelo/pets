import { Filter, ObjectId, WithId } from "mongodb";
import { postsCollection } from "../db/db";
import { Pagination } from "../models/common";
import { PostDbModel } from "../models/db/post.db.model";
import { QueryPostInputModel } from "../models/input/post/query.post.input.model";
import { postMapper } from "../models/mappers/post.mapper";
import { PostOutputModel } from "../models/output/post.output.model";
import { BlogQueryRepository } from "./blog.query.repository";

type SortData = Required<QueryPostInputModel>;

export class PostQueryRepository {
  static async getAllPosts(
    sortData: SortData,
    blogId?: string
  ): Promise<Pagination<PostOutputModel>> {
    const { searchNameTerm, pageSize, pageNumber, sortBy, sortDirection } =
      sortData;
    const filter: Filter<PostDbModel> = {};
    if (searchNameTerm) {
      filter["title"] = { $regex: searchNameTerm, options: "i" };
    }

    if (blogId) {
      filter["blogId"] = new ObjectId(blogId);
    }

    const dbPosts = await postsCollection
      .aggregate<WithId<PostDbModel & { blogName: "string" }>>([
        { $match: filter },
        {
          $lookup: {
            from: "blogs",
            localField: "blogId",
            foreignField: "_id",
            as: "blogDetails",
          },
        },
        { $unwind: "$blogDetails" },
        {
          $project: {
            _id: 1,
            title: 1,
            shortDescription: 1,
            content: 1,
            blogId: 1,
            createdAt: 1,
            blogName: "$blogDetails.name",
          },
        },
        { $sort: { [sortBy]: sortDirection === "asc" ? 1 : -1 } },
      ])
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize)
      .toArray();

    const posts = dbPosts.map(postMapper);

    const totalCount = await postsCollection.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    const result: Pagination<PostOutputModel> = {
      pagesCount,
      page: pageNumber,
      pageSize,
      totalCount,
      items: posts,
    };

    return result;
  }
  static async getPostById(id: string): Promise<
    | (Omit<PostDbModel, "_id" | "blogId"> & {
        id: string;
        blogId: string;
        blogName: string;
      })
    | null
  > {
    const dbPost = await postsCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!dbPost) return null;

    const blog = await BlogQueryRepository.getBlogById(
      dbPost.blogId.toString()
    );
    if (!blog) return null;
    return postMapper({ ...dbPost, blogName: blog.name });
  }
}
