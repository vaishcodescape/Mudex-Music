import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(request: Request) {
  try {
    console.log('Received update profile request');
    
    const session = await getServerSession(authOptions);
    console.log('Current session:', session);
    
    if (!session?.user?.id) {
      console.log('No session or id found');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('Request body:', body);
    
    const { name, email } = body;

    // Validate input
    if (!name || !email) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Update user profile
    console.log('Updating user profile for id:', session.user.id);
    const db = await getDb();
    const usersCollection = db.collection('users');
    const updatedUser = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(session.user.id) },
      { $set: { name, email } },
      { returnDocument: 'after' }
    );
    console.log('Updated user:', updatedUser?.value);

    return NextResponse.json({
      user: {
        name: updatedUser?.value?.name || name,
        email: updatedUser?.value?.email || email,
        image: updatedUser?.value?.image || session.user.image,
      },
    });
  } catch (error) {
    console.error('Error in update profile route:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
} 