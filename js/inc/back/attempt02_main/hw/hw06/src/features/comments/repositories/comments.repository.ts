import { ObjectId, WithId } from "mongodb";
import { Comment } from "../domain/comment";
import { commentsCollection } from "../../../db/db";
import { RepositoryNotFoundError } from "../../../core/errors/repository-not-found.error";
import { CommentAttributes } from "../application/dtos/comment.attributes";

export const commentRepository = {
  async findMany(
    queryDto: any
  ): Promise<{ items: WithId<Comment>[]; totalCount: number }> {
    const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm } =
      queryDto;

    const skip = (pageNumber - 1) * pageSize;
    const filter: any = {};

    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: "i" };
    }

    const items = await commentsCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await commentsCollection.countDocuments(filter);

    return { items, totalCount };
  },
  async findByIdOrFail(id: string): Promise<WithId<Comment>> {
    const comment = await commentsCollection.findOne({ _id: new ObjectId(id) });
    if (!comment) {
      throw new RepositoryNotFoundError("Comment not exist");
    }
    return comment;
  },
  async findById(id: string): Promise<WithId<Comment> | null> {
    const comment = await commentsCollection.findOne({ _id: new ObjectId(id) });
    return comment;
  },
  async findByIdsOrFail(ids: string[]): Promise<WithId<Comment>[]> {
    // 1) Отфильтруем невалидные строки (не ObjectId)
    const objectIds = ids
      .filter((id) => ObjectId.isValid(id))
      .map((id) => new ObjectId(id));

    // 2) Запросим все блоги, у которых _id в нашем списке
    const comments = await commentsCollection
      .find({ _id: { $in: objectIds } })
      .toArray();

    // 3) Если вернулось меньше, чем мы попросили — кинем ошибку
    if (comments.length !== objectIds.length) {
      // Можно определить, какие именно id не нашлись, если хочется
      const foundIds = comments.map((b) => b._id.toHexString());
      const notFound = ids.filter((id) => !foundIds.includes(id));
      throw new RepositoryNotFoundError(
        `Comments not found for id(s): ${notFound.join(", ")}`
      );
    }

    // 4) Всё хорошо — возвращаем массив документов
    return comments;
  },
  async create(newComment: Comment): Promise<string> {
    const insertResult = await commentsCollection.insertOne(newComment);
    return insertResult.insertedId.toString();
  },
  async update(id: string, dto: CommentAttributes): Promise<void> {
    const updateResult = await commentsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: dto }
    );
    if (updateResult.matchedCount < 1) {
      throw new RepositoryNotFoundError("Comment not exist");
    }

    return;
  },
  async delete(id: string): Promise<void> {
    const deleteResult = await commentsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    if (deleteResult.deletedCount < 1) {
      throw new RepositoryNotFoundError("Comment not exist");
    }
    return;
  },
};
