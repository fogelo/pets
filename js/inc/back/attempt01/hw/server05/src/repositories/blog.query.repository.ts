import { ObjectId } from "mongodb";
import { blogsCollection } from "../db/db";
import { Pagination } from "../models/common";
import { blogMapper } from "../models/mappers/blog.mapper";
import { BlogOutputModel } from "../models/output/blog.output.model";
import { QueryBlogInputModel } from "../models/input/blog/query.blog.input.model";

type SortData = Required<QueryBlogInputModel>;

export class BlogQueryRepository {
  static async getAllBlogs(
    sortData: SortData
  ): Promise<Pagination<BlogOutputModel>> {
    const { searchNameTerm, sortBy, sortDirection, pageNumber, pageSize } =
      sortData;
    let filter: Record<string, any> = {};
    if (searchNameTerm) {
      filter["name"] = {
        $regex: searchNameTerm,
        $options: "i",
      };
    }
    const blogs = await blogsCollection
      .find(filter)
      .sort(sortBy, sortDirection)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    const totalCount = await blogsCollection.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    const result: Pagination<BlogOutputModel> = {
      pagesCount,
      page: pageNumber,
      pageSize,
      totalCount,
      items: blogs.map(blogMapper),
    };

    return result;
  }
  static async getBlogById(id: string) {
    const blog = await blogsCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!blog) return null;
    return blogMapper(blog);
  }
}
