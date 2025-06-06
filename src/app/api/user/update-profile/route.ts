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

    const { name, email, image } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const usersCollection = db.collection('users');

    const updatedUser = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(session.user.id) },
      { 
        $set: { 
          name,
          email,
          image,
          updatedAt: new Date()
        } 
      },
      { returnDocument: 'after' }
    );

    if (!updatedUser.value) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: updatedUser.value._id.toString(),
        name: updatedUser.value.name,
        email: updatedUser.value.email,
        image: updatedUser.value.image,
        role: updatedUser.value.role
      }
    });
  } catch (error) {
    console.error('Error in update profile route:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
} 