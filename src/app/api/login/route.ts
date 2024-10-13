// pages/api/login.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';  
import bcrypt from 'bcrypt';

// Define a type for the CORS response
interface CorsResponse {
  status: number;
  headers: {
    [key: string]: string; // This allows for any key-value pairs in headers
  };
}

// CORS middleware
const runCors = (request: Request): Promise<CorsResponse> => {
  return new Promise((resolve) => {
    const origin = request.headers.get('origin');
    const allowedOrigins = ['http://localhost:3000']; // Replace with your frontend URL or add more origins as needed

    if (origin && allowedOrigins.includes(origin)) {
      resolve({
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    } else {
      resolve({
        status: 403,
        headers: {
          'Access-Control-Allow-Origin': '',
        },
      });
    }
  });
};

export async function POST(request: Request) {
  const corsResponse = await runCors(request);
  
  // Return CORS headers for preflight requests
  if (request.method === 'OPTIONS') {
    return NextResponse.json({}, { status: corsResponse.status, headers: corsResponse.headers });
  }

  try {
    const client = await clientPromise;
    const db = client.db('User');  // Replace with your database name
    const collection = db.collection('myCollection');  // Replace with your collection name

    const body = await request.json();
    const { email, password } = body;

    // Find user by email
    const user = await collection.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404, headers: corsResponse.headers });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401, headers: corsResponse.headers });
    }

    // Successful login
    return NextResponse.json({ message: 'Login successful', user: { id: user._id, email: user.email } }, { status: 200, headers: corsResponse.headers });
  } catch (error) {
    return NextResponse.json({ message: 'Error logging in', error: error.message }, { status: 500, headers: corsResponse.headers });
  }
}
