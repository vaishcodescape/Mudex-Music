import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const artistId = searchParams.get('artistId') || session.user.id;

    const db = await getDb();
    const songsCollection = db.collection('songs');

    const songs = await songsCollection
      .find({ artistId: new ObjectId(artistId) })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      songs: songs.map(song => ({
        id: song._id.toString(),
        title: song.title,
        description: song.description,
        genre: song.genre,
        audioUrl: song.audioUrl,
        coverImageUrl: song.coverImageUrl,
        createdAt: song.createdAt,
        artistId: song.artistId.toString()
      }))
    });
  } catch (error) {
    console.error('Error in get artist songs route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artist songs' },
      { status: 500 }
    );
  }
} 