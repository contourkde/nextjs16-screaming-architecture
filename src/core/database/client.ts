import { MongoClient } from "mongodb";

const uri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/nextjs_foundation";

if (!process.env.MONGODB_URI) {
  console.warn('Invalid/Missing environment variable: "MONGODB_URI"');
  console.warn('Using default URI: "mongodb://localhost:27017/nextjs_foundation"');
}

export const mongoClient = new MongoClient(uri);
export const db = mongoClient.db();
