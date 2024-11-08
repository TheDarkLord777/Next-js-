import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('User');  // O'zgartiring, o'z bazangiz nomini kiriting
    const collection = db.collection('myCollection');  // O'zgartiring, o'z kolleksiyangiz nomini kiriting

    const body = await request.json();
    const { email, password } = body;

    // Foydalanuvchini email bo'yicha izlash
    const user = await collection.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Parolni tekshirish
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    // Foydalanuvchi ma'lumotlarini va rolini yuborish
    return NextResponse.json({ message: 'Login successful', user: { id: user._id, email: user.email, role: user.role } }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Error logging in', error: error.message }, { status: 500 });
  }
}
