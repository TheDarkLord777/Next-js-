// pages/api/login.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db'; // Adjust the path to your database connection

// Define a type for the CORS response
interface CorsResponse {
  status: number;
  headers: {
    [key: string]: string; // This allows for any key-value pairs in headers
  };
}

// CORS middleware
const runCors = (): Promise<CorsResponse> => {
  return new Promise((resolve) => {
    // Allow all origins
    resolve({
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  });
};

export async function GET(request: Request) {
  const corsResponse = await runCors();

  // Return CORS headers for preflight requests
  if (request.method === 'OPTIONS') {
    return NextResponse.json({}, { status: corsResponse.status, headers: corsResponse.headers });
  }

  try {
    const client = await clientPromise; // Connect to the database
    const db = client.db('User'); // Replace with your database name
    const collection = db.collection('myCollection'); // Replace with your collection name

    // Fetch all users from the collection
    const users = await collection.find({}).toArray(); // You can customize the query as needed

    // Return the fetched user data
    return NextResponse.json({ message: 'GET request successful', users }, { status: 200, headers: corsResponse.headers });
  } catch (error) {
    return NextResponse.json({ message: 'Error handling GET request', error: error.message }, { status: 500, headers: corsResponse.headers });
  }
}
