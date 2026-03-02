import { MongoClient } from "mongodb";
import { env } from "@core/lib/config";

let _client: MongoClient | null = null;

export const getMongoClient = () => {
  if (!_client) {
    _client = new MongoClient(env.MONGODB_URI);
  }
  return _client;
};

export const getDb = () => getMongoClient().db();
