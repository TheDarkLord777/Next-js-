// pages/api/login.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db'; // Ensure this points to your db connection

// Define a type for the CORS response
interface CorsResponse {
  status: number;
  headers: {
    [key: string]: string;
  };
}

// CORS middleware
const runCors = (): Promise<CorsResponse> => {
  return Promise.resolve({
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

export async function GET(request: Request) {
  const corsResponse = await runCors();

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return NextResponse.json({}, { status: corsResponse.status, headers: corsResponse.headers });
  }

  try {
    console.log('Connecting to database...');
    const client = await clientPromise; // Connect to the database
    console.log('Connected to database.');

    const db = client.db('User'); // Your database name
    const collection = db.collection('myCollection'); // Your collection name

    console.log('Fetching users...');
    const users = await collection.find({}).limit(10).toArray(); // Limit the results
    console.log('Fetched users:', users);

    // Return the fetched user data
    return NextResponse.json({ message: 'GET request successful', users }, { status: 200, headers: corsResponse.headers });
  } catch (error) {
    console.error('Error handling GET request:', error); // Log the error for debugging
    return NextResponse.json({ message: 'Error handling GET request', error: error.message }, { status: 500, headers: corsResponse.headers });
  }
}
