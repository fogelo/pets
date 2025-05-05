import { Db, MongoClient, Collection } from "mongodb";
import { DbCourseModel } from "../features/courses/models/DbCourseModel";

export const DbManager = {
  client: null as MongoClient | null,
  db: null as Db | null,
  async startDb() {
    if (this.client) return; // уже создан экземпляр клиента MongoDb

    const url = process.env.MONGO_URI;
    const dbName = process.env.MONGO_DB_NAME;

    if (!url) {
      throw new Error("MONGO_URI not defined");
    }

    if (!dbName) {
      throw new Error("MONGO_DB_NAME not defined");
    }

    // 1. Создание клиента для управления соединением
    this.client = new MongoClient(url);

    // 2. Устанавливаем соединение с сервером MongoDB
    await this.client.connect();
    console.log("✅ Cоединение с сервером MongoDB установлено");

    // 3. Получаем объект базы данных по имени
    this.db = this.client.db(dbName);
  },
  async stopDb() {
    await this.client?.close();
    this.client = null;
    this.db = null;
    console.log("🟥 Cоединение с сервером MongoDB остановлено");
  },

  getCoursesCollection(): Collection<DbCourseModel> {
    if (!this.db) {
      throw new Error("DbManager not initialized. Call startDb first.");
    }
    return this.db.collection<DbCourseModel>("courses");
  },
};
