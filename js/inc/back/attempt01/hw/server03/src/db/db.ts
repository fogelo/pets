import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
// Connection URL
// const url = "mongodb://localhost:27017";
// const uri = "mongodb+srv://admin:admin@cluster0.0xxdbix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("uri is undefined");
}
export const client = new MongoClient(uri);

// Database Name
const dbName = "inc-hw";

export const db = client.db(dbName);
export const blogsCollection = db.collection("blogs");
export const postsCollection = db.collection("posts");

export async function runDb() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
  } catch (e) {
    console.error(e);
    client.close();
  }
}
