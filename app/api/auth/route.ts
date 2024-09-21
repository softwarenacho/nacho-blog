import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { password } = await req.json();
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (password === ADMIN_PASSWORD) {
    return NextResponse.json({}, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
}
