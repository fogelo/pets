// посты

import { PostDbType } from "../../db/post-db";

export type UpdatePostInputModel = Omit<PostDbType, "_id">;
