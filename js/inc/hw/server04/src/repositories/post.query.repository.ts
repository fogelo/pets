import { Filter, ObjectId } from "mongodb";
import { blogsCollection, postsCollection } from "../db/db";
import { PostDbModel } from "../models/db/post.db.model";
import { blogMapper } from "../models/mappers/blog.mapper";
import { postMapper } from "../models/mappers/post.mapper";
import { PostOutputModel } from "../models/output/post.output.model";
import { QueryPostInputModel } from "../models/input/post/query.post.input.model";
import { Pagination } from "../models/common";

type SortData = Required<QueryPostInputModel>;

export class PostQueryRepository {
  static async getAllPosts(
    sortData: SortData,
    blogId?: string
  ): Promise<Pagination<PostOutputModel>> {
    const { searchNameTerm, pageSize, pageNumber, sortBy, sortDirection } =
      sortData;
    debugger;
    const filter: Filter<PostDbModel> = {};
    if (searchNameTerm) {
      filter["title"] = { $regex: searchNameTerm, options: "i" };
    }

    if (blogId) {
      filter["blogId"] = blogId;
    }

    const dbPosts = await postsCollection
      .find(filter)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort(sortBy, sortDirection)
      .toArray();

    const mappedPosts = dbPosts.map(postMapper);
    const blogObjectIds = [
      ...new Set(dbPosts.map((dbPost) => new ObjectId(dbPost.blogId))),
    ];
    const blogs = await blogsCollection
      .find({ _id: { $in: blogObjectIds } })
      .toArray();

    const mappedBlogs = blogs.map(blogMapper);

    const posts: PostOutputModel[] = mappedPosts.map((post) => {
      const blog = mappedBlogs.find((blog) => blog.id === post.blogId);
      return {
        ...post,
        blogName: blog ? blog.name : "",
      };
    });

    if (sortBy === "blogName") {
      posts.sort((a, b) => {
        if (sortDirection === "asc") {
          return a.blogName
            .toLowerCase()
            .localeCompare(b.blogName.toLowerCase());
        } else {
          return b.blogName
            .toLowerCase()
            .localeCompare(a.blogName.toLowerCase());
        }
      });
    }

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
  static async getPostById(
    id: string
  ): Promise<(Omit<PostDbModel, "_id"> & { id: string }) | null> {
    const post = await postsCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!post) return null;
    return postMapper(post);
  }
}
