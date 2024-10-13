// pages/api/login.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';  
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('User');  // Replace with your database name
    const collection = db.collection('myCollection');  // Replace with your collection name

    const body = await request.json();
    const { email, password } = body;

    // Find user by email
    const user = await collection.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    // Successful login
    return NextResponse.json({ message: 'Login successful', user: { id: user._id, email: user.email } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error logging in', error: error.message }, { status: 500 });
  }
}
