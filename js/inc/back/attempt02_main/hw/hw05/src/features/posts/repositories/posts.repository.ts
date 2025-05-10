import { ObjectId, WithId, Filter } from "mongodb";
import { Post } from "../domain/post";
import { postsCollection } from "../../../db/db";
import { RepositoryNotFoundError } from "../../../core/errors/repository-not-found.error";
import { PostQueryInput } from "../routes/input/post-query.input";
import { PostAttributes } from "../application/dtos/post.attributes";

export const postRepository = {
  async findMany(
    dto: PostQueryInput & { blogId?: string }
  ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
    const {
      blogId,
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
      searchNameTerm,
    } = dto;

    const skip = (pageNumber - 1) * pageSize;
    const filter: Filter<Post> = {};

    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: "i" };
    }

    if (blogId) {
      filter.blogId = blogId;
    }

    const items = await postsCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await postsCollection.countDocuments(filter);

    return { items, totalCount };
  },
  async findByIdOrFail(id: string): Promise<WithId<Post>> {
    const post = await postsCollection.findOne({ _id: new ObjectId(id) });
    if (!post) {
      throw new RepositoryNotFoundError("Post not exist");
    }
    return post;
  },
  async findPostByBlogId(
    blogId: string,
    queryDto: any
  ): Promise<WithId<Post>[]> {
    const posts = await postsCollection.find({ blogId: blogId }).toArray();
    return posts;
  },
  async create(newPost: Post): Promise<string> {
    const insertResult = await postsCollection.insertOne(newPost);
    return insertResult.insertedId.toString();
  },
  async update(id: string, dto: PostAttributes): Promise<void> {
    const updateResult = await postsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: dto }
    );
    if (updateResult.matchedCount < 1) {
      throw new RepositoryNotFoundError("Post not exist");
    }

    return;
  },
  async delete(id: string): Promise<void> {
    const deleteResult = await postsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    if (deleteResult.deletedCount < 1) {
      throw new RepositoryNotFoundError("Post not exist");
    }
    return;
  },
};
