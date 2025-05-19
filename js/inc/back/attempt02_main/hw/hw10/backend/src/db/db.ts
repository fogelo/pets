import { Collection, Db, MongoClient } from "mongodb";
import { Blog } from "../features/blogs/domain/blog";
import { SETTINGS } from "../core/settings/settings";
import { Post } from "../features/posts/domain/post";
import { Comment } from "../features/comments/domain/comment";
import { User } from "../features/users/types/user";
import { RevokedToken } from "../features/auth/types/revoked-token";
import { RequestLog } from "../core/types/request-log";
import { Device } from "../features/auth/types/device";

const USER_COLLECTION_NAME = "users";
const BLOG_COLLECTION_NAME = "blogs";
const POST_COLLECTION_NAME = "posts";
const COMMENT_COLLECTION_NAME = "comments";
const REVOKED_REFRESH_TOKENS_COLLECTION_NAME = "revoked-refresh-tokens";
const REQUEST_LOGS_COLLECTION_NAME = "reques-logs";
const DEVICES_COLLECTION_NAME = "devices";

export let client: MongoClient;
export let usersCollection: Collection<User>;
export let blogsCollection: Collection<Blog>;
export let postsCollection: Collection<Post>;
export let commentsCollection: Collection<Comment>;
export let revokedRefreshTokensCollection: Collection<RevokedToken>;
export let requestLogsCollection: Collection<RequestLog>;
export let devicesCollection: Collection<Device>;

// export async function runDB(url: string): Promise<void> {
//   client = new MongoClient(url);
//   const db: Db = client.db(SETTINGS.DB_NAME);

//   usersCollection = db.collection<User>(USER_COLLECTION_NAME);
//   blogsCollection = db.collection<Blog>(BLOG_COLLECTION_NAME);
//   postsCollection = db.collection<Post>(POST_COLLECTION_NAME);
//   commentsCollection = db.collection<Comment>(COMMENT_COLLECTION_NAME);
//   revokedRefreshTokensCollection = db.collection<RevokedToken>(
//     REVOKED_REFRESH_TOKENS_COLLECTION_NAME
//   );
//   requestLogsCollection = db.collection<RequestLog>(
//     REQUEST_LOGS_COLLECTION_NAME
//   );
//   devicesCollection = db.collection<Device>(DEVICES_COLLECTION_NAME);

//   try {
//     await client.connect();
//     await db.command({ ping: 1 });
//     console.log(`✅ Подключение к базе данных установлено: ${url}`);
//   } catch (e) {
//     await client.close();
//     throw new Error(`❌ Нет подключения к базе банных: ${e}`);
//   }
// }

export const DbManager = {
  client: null as MongoClient | null,
  db: null as Db | null,

  async startDb() {
    if (this.client) return;

    const url = SETTINGS.MONGO_URL;
    const dbName = SETTINGS.DB_NAME;

    if (!url) throw new Error("MONGO_URI not defined");
    if (!dbName) throw new Error("MONGO_DB_NAME not defined");

    // 1. Создание клиента для управления соединением
    this.client = new MongoClient(url);

    // 2. Устанавливаем соединение с сервером MongoDB
    await this.client.connect();
    console.log("✅ Соединение с сервером MongoDB установлено");

    // 3. Получаем объект базы данных по имени
    this.db = this.client.db(dbName);

    usersCollection = this.db.collection<User>(USER_COLLECTION_NAME);
    blogsCollection = this.db.collection<Blog>(BLOG_COLLECTION_NAME);
    postsCollection = this.db.collection<Post>(POST_COLLECTION_NAME);
    commentsCollection = this.db.collection<Comment>(COMMENT_COLLECTION_NAME);
    revokedRefreshTokensCollection = this.db.collection<RevokedToken>(
      REVOKED_REFRESH_TOKENS_COLLECTION_NAME
    );
    requestLogsCollection = this.db.collection<RequestLog>(
      REQUEST_LOGS_COLLECTION_NAME
    );
    devicesCollection = this.db.collection<Device>(DEVICES_COLLECTION_NAME);
  },

  async stopDb() {
    await this.client?.close();
    this.client = null;
    this.db = null;
    console.log("🟥 Соединение с сервером MongoDB остановлено");
  },

  getUsersCollection(): Collection<User> {
    if (!this.db)
      throw new Error("DbManager not initialized. Call startDb first.");
    return this.db.collection<User>(USER_COLLECTION_NAME);
  },

  getBlogsCollection(): Collection<Blog> {
    if (!this.db)
      throw new Error("DbManager not initialized. Call startDb first.");
    return this.db.collection<Blog>(BLOG_COLLECTION_NAME);
  },

  getPostsCollection(): Collection<Post> {
    if (!this.db)
      throw new Error("DbManager not initialized. Call startDb first.");
    return this.db.collection<Post>(POST_COLLECTION_NAME);
  },

  getCommentsCollection(): Collection<Comment> {
    if (!this.db)
      throw new Error("DbManager not initialized. Call startDb first.");
    return this.db.collection<Comment>(COMMENT_COLLECTION_NAME);
  },

  getRevokedRefreshTokensCollection(): Collection<RevokedToken> {
    if (!this.db)
      throw new Error("DbManager not initialized. Call startDb first.");
    return this.db.collection<RevokedToken>(
      REVOKED_REFRESH_TOKENS_COLLECTION_NAME
    );
  },

  getRequestLogsCollection(): Collection<RequestLog> {
    if (!this.db)
      throw new Error("DbManager not initialized. Call startDb first.");
    return this.db.collection<RequestLog>(REQUEST_LOGS_COLLECTION_NAME);
  },

  getDevicesCollection(): Collection<Device> {
    if (!this.db)
      throw new Error("DbManager not initialized. Call startDb first.");
    return this.db.collection<Device>(DEVICES_COLLECTION_NAME);
  },
};
