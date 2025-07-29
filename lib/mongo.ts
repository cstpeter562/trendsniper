import { MongoClient } from "mongodb";

if (!process.env.MONGO_URI) throw new Error("Missing MONGO_URI");

const uri = process.env.MONGO_URI;
const dbName = "trendsniper";

// Use global to persist the client across hot reloads (Next.js specific trick)
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export const connectToDatabase = async () => {
  const client = await clientPromise;
  const db = client.db(dbName);
  return {
    db,
    trends: db.collection("trends")
  };
};
