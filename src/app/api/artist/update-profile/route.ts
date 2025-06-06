import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const bio = formData.get('bio') as string;
    const instagram = formData.get('instagram') as string;
    const twitter = formData.get('twitter') as string;
    const youtube = formData.get('youtube') as string;
    const username = formData.get('username') as string;
    const profileImage = formData.get('profileImage') as File;

    if (!username) {
      return NextResponse.json({ message: 'Username is required' }, { status: 400 });
    }

    // Handle image upload if provided
    let imageUrl = session.user.image;
    if (profileImage) {
      // Convert the image to base64
      const bytes = await profileImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${profileImage.type};base64,${buffer.toString('base64')}`;
      imageUrl = base64Image;
    }

    const db = await getDb();
    
    // Update user profile
    const usersCollection = db.collection('users');
    const updatedUser = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(session.user.id) },
      { $set: { name: username, image: imageUrl } },
      { returnDocument: 'after' }
    );

    // Update or create artist profile
    const artistProfilesCollection = db.collection('artistprofiles');
    const artistProfile = await artistProfilesCollection.findOneAndUpdate(
      { userId: session.user.id },
      { $set: { bio: bio || '', instagram: instagram || '', twitter: twitter || '', youtube: youtube || '', updatedAt: new Date() } },
      { upsert: true, returnDocument: 'after' }
    );

    return NextResponse.json({
      user: updatedUser?.value || { _id: session.user.id, name: username, image: imageUrl },
      artistProfile: artistProfile?.value || { userId: session.user.id, bio, instagram, twitter, youtube },
    });
  } catch (error) {
    console.error('Error in update profile route:', error);
    return NextResponse.json(
      { message: 'Failed to update profile' },
      { status: 500 }
    );
  }
} 