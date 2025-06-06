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

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const genre = formData.get('genre') as string;
    const audioFile = formData.get('audio') as File;
    const coverImage = formData.get('coverImage') as File;

    if (!title || !audioFile) {
      return NextResponse.json(
        { error: 'Title and audio file are required' },
        { status: 400 }
      );
    }

    // TODO: Implement file upload to cloud storage (e.g., AWS S3)
    // For now, we'll just store the file metadata
    const db = await getDb();
    const songsCollection = db.collection('songs');

    const result = await songsCollection.insertOne({
      title,
      description: description || '',
      genre: genre || '',
      artistId: new ObjectId(session.user.id),
      audioUrl: 'placeholder', // Replace with actual URL after file upload
      coverImageUrl: 'placeholder', // Replace with actual URL after file upload
      duration: '0:00', // Will be updated after audio processing
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({
      song: {
        id: result.insertedId.toString(),
        title,
        description,
        genre,
        artistId: session.user.id,
        audioUrl: 'placeholder',
        coverImageUrl: 'placeholder',
        duration: '0:00'
      }
    });
  } catch (error) {
    console.error('Error in song upload route:', error);
    return NextResponse.json(
      { error: 'Failed to upload song' },
      { status: 500 }
    );
  }
} 