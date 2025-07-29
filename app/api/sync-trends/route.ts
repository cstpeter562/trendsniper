// app/api/sync-trends/route.ts

import { MongoClient } from 'mongodb';
import { MONGO_URI, DB_NAME } from '@/lib/mongo';

async function syncTrends() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const trends = db.collection('trends');

    // Example: insert a dummy trend
    const result = await trends.insertOne({
      name: "Example trend",
      timestamp: new Date()
    });

    console.log("Trend synced:", result.insertedId);
  } catch (error) {
    console.error("Sync failed:", error);
    process.exit(1); // Ensure CI fails on error
  } finally {
    await client.close();
  }
}

syncTrends();
