import { WithId } from "mongodb";
import { Comment } from "../domain/comment";
import { commentRepository } from "../repositories/comments.repository";
import { CommentAttributes } from "./dtos/comment.attributes";

export const commentsService = {
  async findMany(
    queryDto: any
  ): Promise<{ items: WithId<Comment>[]; totalCount: number }> {
    const result = commentRepository.findMany(queryDto);
    return result;
  },
  async findByIdOrFail(id: string): Promise<WithId<Comment>> {
    return commentRepository.findByIdOrFail(id);
  },
  async findByIdsOrFail(ids: string[]): Promise<WithId<Comment>[]> {
    return commentRepository.findByIdsOrFail(ids);
  },
  async create(dto: CommentAttributes): Promise<string> {
    const newComment = {
      content: dto.content,
      createdAt: new Date(),
      userId: dto.userId,
      postId: dto.postId,
    };
    const createdCommentId = commentRepository.create(newComment);
    return createdCommentId;
  },
  async update(
    id: string,
    dto: {
      content: string;
    }
  ): Promise<void> {
    await commentRepository.update(id, dto);
    return;
  },
  async delete(id: string): Promise<void> {
    return commentRepository.delete(id);
  },
};
