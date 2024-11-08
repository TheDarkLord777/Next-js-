import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';  
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('User'); 
    const collection = db.collection('myCollection'); 

    const body = await request.json();
    const { name, email, password, role } = body;

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Agar role yo'q bo'lsa, uni "user" qilib belgilash
    const userRole = role || 'user';  // default value 'user'

    const result = await collection.insertOne({ name, email, password: hashedPassword, role: userRole });

    return NextResponse.json({ message: 'User registered successfully', result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error inserting data', error: error.message },
      { status: 500 }
    );
  }
}
