import { MongoClient } from "mongodb";

// Safe environment variable extraction
export const MONGO_URI =
  process.env.MONGO_URI ?? (() => { throw new Error("MONGO_URI not set"); })();

export const DB_NAME =
  process.env.DB_NAME ?? (() => { throw new Error("DB_NAME not set"); })();

if (!MONGO_URI.startsWith("mongodb")) {
  throw new Error("MONGO_URI must start with 'mongodb'");
}

let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGO_URI);

  await client.connect();
  cachedClient = client;

  return client;
}
