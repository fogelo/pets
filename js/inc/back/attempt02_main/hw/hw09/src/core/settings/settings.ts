export const SETTINGS = {
  PORT: process.env.PORT || 80,
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017",
  DB_NAME: process.env.DB_NAME || "inc-hw",

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "123",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "123",
};
