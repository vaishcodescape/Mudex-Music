import { MongoClient, Db } from 'mongodb';

let db: Db | null = null;
let client: MongoClient | null = null;

async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db;
  }

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  try {
    client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    db = client.db();
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function getDb(): Promise<Db> {
  if (db) {
    return db;
  }
  return await connectToDatabase();
}

export async function closeConnection(): Promise<void> {
  if (client) {
    await client.close();
    db = null;
    client = null;
    console.log('MongoDB connection closed');
  }
} 