import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URI || ''
const dbName = 'trendsniper'
const collectionName = 'trends'

export const dynamic = 'force-dynamic'

export async function GET() {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    const trends = await collection.find({}).sort({ hype: -1 }).toArray()
    return NextResponse.json(trends)
  } catch (error) {
    console.error('Error fetching trends:', error)
    return NextResponse.json({ error: 'Failed to fetch trends' }, { status: 500 })
  } finally {
    await client.close()
  }
}
