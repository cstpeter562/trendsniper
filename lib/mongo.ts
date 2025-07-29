import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://stpeterchristian:mG4UH4UKf424qG7z@trendsniper.tkjydw6.mongodb.net/?retryWrites=true&w=majority&appName=TrendSniper';
const client = new MongoClient(uri);
const dbName = 'TrendSniper';

export async function getTrendsFromDB() {
  if (!client.topology?.isConnected()) {
    await client.connect();
  }

  const db = client.db(dbName);
  const collection = db.collection('trends');
  const trends = await collection.find({}).toArray();
  return trends;
}
