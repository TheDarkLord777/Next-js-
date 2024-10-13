import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';  
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

// GET: Fetch data from MongoDB
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('User');  // Replace with your database name
    const collection = db.collection('myCollection');  // Replace with your collection name

    const data = await collection.find({}).toArray();  // Fetch all documents
    return NextResponse.json({ message: 'Data fetched successfully', data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching data', error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('User');  // O'zgartiring: o'z ma'lumotlar bazangiz nomini
    const collection = db.collection('myCollection');  // O'zgartiring: o'z to'plamingiz nomini

    const body = await request.json();
    const { email, password } = body;

    // Parolni xesh qilish
    const saltRounds = 10; // Xesh qilish qatlamlar soni
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Yangi foydalanuvchini qo'shish
    const result = await collection.insertOne({ email, password: hashedPassword });  // Xesh qilingan parol bilan saqlash

    return NextResponse.json({ message: 'User registered successfully', result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error inserting data', error: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update data in MongoDB
export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('User');  // Replace with your database name
    const collection = db.collection('myCollection');  // Replace with your collection name

    const body = await request.json();
    const { id, ...updateData } = body;  // Assume you're sending an ID to update a specific document
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });  // Update document

    return NextResponse.json({ message: 'Data updated', result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating data', error: error.message },
      { status: 500 }
    );
  }
}


// DELETE: Delete data from MongoDB
export async function DELETE(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('User');  // Replace with your database name
    const collection = db.collection('myCollection');  // Replace with your collection name

    const body = await request.json();
    const { id } = body;  // Assume you're sending an ID to delete a specific document
    await collection.deleteOne({ _id: new ObjectId(id) });  // Delete document

    // Return 204 No Content without a body
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting data', error: error.message },
      { status: 500 }
    );
  }
}

