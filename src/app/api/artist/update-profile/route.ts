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

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const bio = formData.get('bio') as string;
    const genre = formData.get('genre') as string;
    const instagram = formData.get('instagram') as string;
    const twitter = formData.get('twitter') as string;
    const youtube = formData.get('youtube') as string;
    const profileImage = formData.get('profileImage') as File;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Handle image upload if provided
    let imageUrl = session.user.image;
    if (profileImage) {
      const bytes = await profileImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${profileImage.type};base64,${buffer.toString('base64')}`;
      imageUrl = base64Image;
    }

    const db = await getDb();
    
    // Update user profile
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
          image: imageUrl,
          updatedAt: new Date()
        } 
      },
      { returnDocument: 'after' }
    ) as { value: any } | null;

    if (!updatedUser?.value) {
      return NextResponse.json(
        { error: 'Artist not found' },
        { status: 404 }
      );
    }

    // Update or create artist profile
    const artistProfilesCollection = db.collection('artistprofiles');
    const artistProfile = await artistProfilesCollection.findOneAndUpdate(
      { userId: session.user.id },
      { 
        $set: { 
          bio: bio || '',
          genre: genre || '',
          instagram: instagram || '',
          twitter: twitter || '',
          youtube: youtube || '',
          updatedAt: new Date()
        } 
      },
      { upsert: true, returnDocument: 'after' }
    ) as { value: any } | null;

    return NextResponse.json({
      artist: {
        id: updatedUser.value._id.toString(),
        name: updatedUser.value.name,
        email: updatedUser.value.email,
        image: updatedUser.value.image,
        role: updatedUser.value.role,
        profile: {
          bio: artistProfile?.value?.bio || '',
          genre: artistProfile?.value?.genre || '',
          instagram: artistProfile?.value?.instagram || '',
          twitter: artistProfile?.value?.twitter || '',
          youtube: artistProfile?.value?.youtube || ''
        }
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