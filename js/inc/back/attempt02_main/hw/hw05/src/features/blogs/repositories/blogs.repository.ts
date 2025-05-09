import { ObjectId, WithId } from "mongodb";
import { Blog } from "../domain/blog";
import { blogsCollection } from "../../../db/db";
import { RepositoryNotFoundError } from "../../../core/errors/repository-not-found.error";
import { BlogQueryInput } from "../routes/input/blog-query.input";
import { BlogAttributes } from "../application/dtos/blog.attributes";

export const blogRepository = {
  async findMany(queryDto: BlogQueryInput): Promise<WithId<Blog>[]> {
    const { ids } = queryDto;
    const filter: any = {};

    if (ids && ids.length) {
      const objectIds = ids.map((id) => new ObjectId(id));
      filter._id = { $in: objectIds };
    }

    const result = await blogsCollection.find(filter).toArray();
    return result;
  },
  async findByIdOrFail(id: string): Promise<WithId<Blog>> {
    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    if (!blog) {
      throw new RepositoryNotFoundError("Blog not exist");
    }
    return blog;
  },
  async create(newBlog: Blog): Promise<string> {
    const insertResult = await blogsCollection.insertOne(newBlog);
    return insertResult.insertedId.toString();
  },
  async update(id: string, dto: BlogAttributes): Promise<void> {
    const updateResult = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: dto }
    );
    if (updateResult.matchedCount < 1) {
      throw new RepositoryNotFoundError("Blog not exist");
    }

    return;
  },
  async delete(id: string): Promise<void> {
    const deleteResult = await blogsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    if (deleteResult.deletedCount < 1) {
      throw new RepositoryNotFoundError("Blog not exist");
    }
    return;
  },
};
