import { Collection, Db, MongoClient } from "mongodb";
import { Blog } from "../features/blogs/domain/blog";
import { SETTINGS } from "../core/settings/settings";
import { Post } from "../features/posts/domain/post";
import { Comment } from "../features/comments/domain/comment";
import { User } from "../features/users/types/user";
import { RevokedToken } from "../features/auth/types/revoked-token";

const USER_COLLECTION_NAME = "users";
const BLOG_COLLECTION_NAME = "blogs";
const POST_COLLECTION_NAME = "posts";
const COMMENT_COLLECTION_NAME = "comments";
const REVOKED_REFRESH_TOKENS_COLLECTION_NAME = "revoked-refresh-tokens";

export let client: MongoClient;
export let usersCollection: Collection<User>;
export let blogsCollection: Collection<Blog>;
export let postsCollection: Collection<Post>;
export let commentsCollection: Collection<Comment>;
export let revokedRefreshTokensCollection: Collection<RevokedToken>;

export async function runDB(url: string): Promise<void> {
  client = new MongoClient(url);
  const db: Db = client.db(SETTINGS.DB_NAME);

  usersCollection = db.collection<User>(USER_COLLECTION_NAME);
  blogsCollection = db.collection<Blog>(BLOG_COLLECTION_NAME);
  postsCollection = db.collection<Post>(POST_COLLECTION_NAME);
  commentsCollection = db.collection<Comment>(COMMENT_COLLECTION_NAME);
  revokedRefreshTokensCollection = db.collection<RevokedToken>(
    REVOKED_REFRESH_TOKENS_COLLECTION_NAME
  );

  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log(`✅ Подключение к базе данных установлено: ${url}`);
  } catch (e) {
    await client.close();
    throw new Error(`❌ Нет подключения к базе банных: ${e}`);
  }
}
