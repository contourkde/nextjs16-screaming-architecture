import { MongoClient } from "mongodb";
import { env } from "@core/lib/config";

const uri = env.MONGODB_URI;

export const mongoClient = new MongoClient(uri);
export const db = mongoClient.db();
