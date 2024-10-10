import { NextResponse } from 'next/server';

// GET: If you're not using the `request` object, you can remove it
export async function GET() {
  return NextResponse.json({ message: 'Hello from the API!' }, { status: 200 });
}

// POST: Handle JSON input and provide appropriate status codes
export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ message: 'Data received', data: body }, { status: 201 }); // 201 Created
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid JSON input', error: error.message },
      { status: 400 } // 400 Bad Request for invalid input
    );
  }
}

// PUT: Handle JSON input and return status for update success or failure
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ message: 'Data updated', data: body }, { status: 200 }); // 200 OK
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid JSON input', error: error.message },
      { status: 400 } // 400 Bad Request
    );
  }
}

// DELETE: If you're not using the `request` object, remove it
export async function DELETE() {
  return NextResponse.json({ message: 'Resource deleted' }, { status: 204 }); // 204 No Content
}
