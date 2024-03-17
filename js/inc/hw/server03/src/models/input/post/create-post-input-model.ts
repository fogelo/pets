import { PostDbType } from "../../db/post-db";

export type CreatePostInputModel = Omit<PostDbType, "_id">;
