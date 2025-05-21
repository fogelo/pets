import { WithId } from "mongodb";
import { RepositoryNotFoundError } from "../../../core/errors/repository-not-found.error";
import { postLikesCollection } from "../../../db/db";
import { PostLike } from "../domain/post-like";

export const postLikesRepository = {
  async getLikeCountForPost(queryDto: {
    postId: string;
    likeStatus?: "None" | "Like" | "Dislike";
  }): Promise<number> {
    const { postId, likeStatus } = queryDto;
    const filter: any = {};

    if (postId) {
      filter.postId = postId;
    }
    if (likeStatus) {
      filter.likeStatus = likeStatus;
    }

    const totalCount = await postLikesCollection.countDocuments(filter);

    return totalCount;
  },
  async findByPostIdAndUserId(
    postId: string,
    userId?: string
  ): Promise<WithId<PostLike> | null> {
    const filter: any = {};

    if (postId) {
      filter.postId = postId;
    }
    if (userId) {
      filter.userId = userId;
    }

    const post = await postLikesCollection.findOne(filter);
    return post;
  },
  async findSomeLatestPostLikesByPostId(
    postId: string,
    count: number
  ): Promise<WithId<PostLike>[]> {
    const filter: any = {};

    if (postId) {
      filter.postId = postId;
    }
    const posts = await postLikesCollection
      .find(filter)
      .sort({ ["createdAt"]: -1 })
      .limit(count)
      .toArray();
    return posts;
  },
  async create(newPostLike: PostLike): Promise<string> {
    const insertResult = await postLikesCollection.insertOne(newPostLike);
    return insertResult.insertedId.toString();
  },
  async update(
    postId: string,
    userId: string,
    dto: {
      likeStatus: "None" | "Like" | "Dislike";
    }
  ): Promise<void> {
    const updateResult = await postLikesCollection.updateOne(
      {
        postId,
        userId,
      },
      { $set: dto }
    );
    if (updateResult.matchedCount < 1) {
      throw new RepositoryNotFoundError("PostLike not exist");
    }

    return;
  },
};
