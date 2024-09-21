import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data, error } = await supabase
    .from('posts')
    .select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { title, content, id } = await req.json();
  if (id) {
    const { data, error: updateError } = await supabase
      .from('posts')
      .update({ title, content })
      .eq('id', id);
    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Post updated', data });
  } else {
    const { data, error: insertError } = await supabase
      .from('posts')
      .insert([{ title, content }]);
    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Post created', data });
  }
}
