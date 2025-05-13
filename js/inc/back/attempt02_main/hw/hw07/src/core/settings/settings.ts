export const SETTINGS = {
    PORT: process.env.PORT || 80,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017',
    DB_NAME: process.env.DB_NAME || 'inc-hw',

    JWT_SECRET: process.env.JWT_SECRET || '123',
  };