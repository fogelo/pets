import { ObjectId, WithId, Filter, Document } from "mongodb";
import { Post } from "../domain/post";
import { postsCollection } from "../../../db/db";
import { RepositoryNotFoundError } from "../../../core/errors/repository-not-found.error";
import { PostQueryInput } from "../routes/input/post-query.input";
import { PostAttributes } from "../application/dtos/post.attributes";
import { PostSortField } from "../routes/input/post-sort-field";

export const postRepository = {
  async findMany(dto: PostQueryInput & { blogId?: string }): Promise<{
    items: WithId<Post & { blogName: string }>[];
    totalCount: number;
  }> {
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

    const totalCount = await postsCollection.countDocuments(filter);

    // Сборка pipeline
    const pipeline: Document[] = [
      { $match: filter },

      // добавляем временное поле с ObjectId(), чтобы найти по id
      {
        $addFields: {
          blogObjectId: { $toObjectId: "$blogId" },
        },
      },

      // джойн к блогам
      {
        $lookup: {
          from: "blogs",
          localField: "blogObjectId",
          foreignField: "_id",
          as: "blogData",
        },
      },
      { $unwind: "$blogData" },
    ];

    // добавление в pipline сортировки
    const direction = sortDirection === "asc" ? 1 : -1;
    if (sortBy === PostSortField.BlogName) {
      pipeline.push({ $sort: { "blogData.name": direction } });
    } else {
      pipeline.push({ $sort: { [sortBy]: direction } });
    }

    // добавление в pipline пагинации
    pipeline.push({ $skip: skip }, { $limit: pageSize });

    //добавление в pipline схемы объекта
    pipeline.push({
      $project: {
        id: "$_id",
        title: 1,
        shortDescription: 1,
        content: 1,
        blogId: 1,
        blogName: "$blogData.name",
        createdAt: 1,
        // … не указываем blogObjectId, значит оно отсечётся
      },
    });

    const items = await postsCollection
      .aggregate<WithId<Post & { blogName: string }>>(pipeline)
      .toArray();

    return { items, totalCount };
  },
  async findByIdOrFail(
    id: string
  ): Promise<WithId<Post & { blogName: string }>> {
    const pipeline: Document[] = [
      { $match: { _id: new ObjectId(id) } },

      // превратить строковый post.blogId в ObjectId (если нужно)
      {
        $addFields: {
          blogObjectId: { $toObjectId: "$blogId" },
        },
      },

      // джойн к блогам
      {
        $lookup: {
          from: "blogs",
          localField: "blogObjectId",
          foreignField: "_id",
          as: "blogData",
        },
      },
      { $unwind: "$blogData" },

      // проекция нужных полей
      {
        $project: {
          // остаются поля из post
          id: "$_id",
          title: 1,
          shortDescription: 1,
          content: 1,
          blogId: 1,
          createdAt: 1,
          // добавляем поле blogName
          blogName: "$blogData.name",
        },
      },
    ];

    const [post] = await postsCollection
      .aggregate<WithId<Post & { blogName: string }>>(pipeline)
      .toArray();

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
