import { MongoClient } from "mongodb";
import { ICourse } from "./courses_repository";

// url для подключения к бд
const url = process.env.mongoURL || "mongodb://localhost:27017";

// создаем клиента для mongodb, наша программа является клиентом для mongodb
export const client = new MongoClient(url);

// Database Name
const dbName = "inc";
export const coursesCollection = client
  .db(dbName)
  .collection<ICourse>("courses");

export async function runDb() {
  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Подключен к mongo серверу");

    //   const collection = db.collection("documents");
  } catch {
    client.close();
  }
}

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());
