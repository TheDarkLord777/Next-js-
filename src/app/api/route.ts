import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ message: 'Hello from the API!' });
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ message: 'Data received', data: body });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid JSON input', error: error.message });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ message: 'Data updated', data: body });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid JSON input', error: error.message });
  }
}


export async function DELETE(request: Request) {
  return NextResponse.json({ message: 'Resource deleted' });
}
