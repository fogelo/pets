import { MongoClient } from "mongodb";

// Connection URL
// const url = "mongodb://localhost:27017";
const uri = "mongodb+srv://admin:admin@cluster0.0xxdbix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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


