import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';

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
    const audioFile = formData.get('audio') as File;
    const coverFile = formData.get('cover') as File;
    const title = formData.get('title') as string;
    const artist = formData.get('artist') as string;
    const genre = formData.get('genre') as string;
    const description = formData.get('description') as string;

    if (!audioFile || !title || !artist) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Implement actual file upload to storage service (e.g., AWS S3)
    // For now, we'll just create the database entry
    const db = await getDb();
    const songsCollection = db.collection('songs');
    const song = await songsCollection.insertOne({
      title,
      artist,
      genre,
      description,
      userId: session.user.id,
      // These will be updated once we implement file upload
      audioUrl: 'placeholder',
      coverImage: 'placeholder',
      duration: '0:00',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ _id: song.insertedId, title, artist, genre, description });
  } catch (error) {
    console.error('Error uploading song:', error);
    return NextResponse.json(
      { error: 'Failed to upload song' },
      { status: 500 }
    );
  }
} 