import { WithId } from "mongodb";
import { Post } from "../domain/post";
import { PostAttributes } from "./dtos/post.attributes";
import { postLikesRepository } from "../repositories/post-likes.repository";
import { PostLike } from "../domain/post-like";

export const postLikesService = {
  async getLikeCountForPost(queryDto: {
    postId: string;
    likeStatus?: "None" | "Like" | "Dislike";
  }): Promise<number> {
    const result = postLikesRepository.getLikeCountForPost(queryDto);
    return result;
  },
  async findByPostIdAndUserId(
    postId: string,
    userId?: string
  ): Promise<WithId<PostLike> | null> {
    return postLikesRepository.findByPostIdAndUserId(postId, userId);
  },
  async findSomeLatestPostLikesByPostId(
    postId: string,
    count: number
  ): Promise<WithId<PostLike>[]> {
    return postLikesRepository.findSomeLatestPostLikesByPostId(postId, count);
  },
  async create(dto: {
    postId: string;
    userId: string;
    likeStatus: "None" | "Like" | "Dislike";
  }): Promise<string> {
    const newPostLike = {
      createdAt: new Date(),
      userId: dto.userId,
      postId: dto.postId,
      likeStatus: dto.likeStatus,
    };
    const createdPostLikeId = postLikesRepository.create(newPostLike);
    return createdPostLikeId;
  },
  async update(
    postId: string,
    userId: string,
    dto: {
      likeStatus: "None" | "Like" | "Dislike";
    }
  ): Promise<void> {
    await postLikesRepository.update(postId, userId, dto);
    return;
  },
};
