import { ObjectId, WithId } from "mongodb";
import { Blog } from "../domain/blog";
import { blogsCollection } from "../../../db/db";
import { RepositoryNotFoundError } from "../../../core/errors/repository-not-found.error";
import { BlogQueryInput } from "../routes/input/blog-query.input";
import { BlogAttributes } from "../application/dtos/blog.attributes";

export const blogRepository = {
  async findMany(
    queryDto: BlogQueryInput
  ): Promise<{ items: WithId<Blog>[]; totalCount: number }> {
    const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm } =
      queryDto;

    const skip = (pageNumber - 1) * pageSize;
    const filter: any = {};

    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: "i" };
    }

    const items = await blogsCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await blogsCollection.countDocuments(filter);

    return { items, totalCount };
  },
  async findByIdOrFail(id: string): Promise<WithId<Blog>> {
    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    if (!blog) {
      throw new RepositoryNotFoundError("Blog not exist");
    }
    return blog;
  },
  async findById(id: string): Promise<WithId<Blog> | null> {
    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    return blog;
  },
  async findByIdsOrFail(ids: string[]): Promise<WithId<Blog>[]> {
    // 1) Отфильтруем невалидные строки (не ObjectId)
    const objectIds = ids
      .filter((id) => ObjectId.isValid(id))
      .map((id) => new ObjectId(id));

    // 2) Запросим все блоги, у которых _id в нашем списке
    const blogs = await blogsCollection
      .find({ _id: { $in: objectIds } })
      .toArray();

    // 3) Если вернулось меньше, чем мы попросили — кинем ошибку
    if (blogs.length !== objectIds.length) {
      // Можно определить, какие именно id не нашлись, если хочется
      const foundIds = blogs.map((b) => b._id.toHexString());
      const notFound = ids.filter((id) => !foundIds.includes(id));
      throw new RepositoryNotFoundError(
        `Blogs not found for id(s): ${notFound.join(", ")}`
      );
    }

    // 4) Всё хорошо — возвращаем массив документов
    return blogs;
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
