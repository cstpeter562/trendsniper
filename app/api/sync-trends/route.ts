import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongo';
import Trend from '@/models/Trend';
import { fetchTrendsFromSources } from '@/lib/fetchTrends';

export async function POST() {
  try {
    await connectToDatabase();
    const newTrends = await fetchTrendsFromSources();

    for (const trend of newTrends) {
      await Trend.updateOne(
        { name: trend.name },
        { $set: trend },
        { upsert: true }
      );
    }

    return NextResponse.json({ success: true, message: 'Trends synced successfully' });
  } catch (error) {
    console.error('Error syncing trends:', error);
    return NextResponse.json({ success: false, error: 'Failed to sync trends' }, { status: 500 });
  }
}
