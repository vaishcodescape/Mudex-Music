import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const db = await getDb();
    const songsCollection = db.collection('songs');
    const songs = await songsCollection.find({ userId: session.user.id }).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(songs);
  } catch (error) {
    console.error('Error fetching artist songs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch songs' },
      { status: 500 }
    );
  }
} 