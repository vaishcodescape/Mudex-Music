import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, email, bio, genre, image } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const usersCollection = db.collection('users');

    const updatedUser = await usersCollection.findOneAndUpdate(
      { 
        _id: new ObjectId(session.user.id),
        role: 'artist'
      },
      { 
        $set: { 
          name,
          email,
          bio,
          genre,
          image,
          updatedAt: new Date()
        } 
      },
      { returnDocument: 'after' }
    );

    if (!updatedUser.value) {
      return NextResponse.json(
        { error: 'Artist not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      artist: {
        id: updatedUser.value._id.toString(),
        name: updatedUser.value.name,
        email: updatedUser.value.email,
        bio: updatedUser.value.bio,
        genre: updatedUser.value.genre,
        image: updatedUser.value.image,
        role: updatedUser.value.role
      }
    });
  } catch (error) {
    console.error('Error in update artist profile route:', error);
    return NextResponse.json(
      { error: 'Failed to update artist profile' },
      { status: 500 }
    );
  }
} 