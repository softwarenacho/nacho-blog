import { supabase } from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const includeDrafts = searchParams.get('includeDrafts') === 'true';
  const tag = searchParams.get('tag');

  let query = supabase.from('posts').select('*');

  if (!includeDrafts) {
    query = query.eq('draft', false);
  }

  if (tag) {
    query = query.eq('tag', tag);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { title, content, id, draft, tag } = await req.json();
  if (id) {
    const { data, error: updateError } = await supabase
      .from('posts')
      .update({ title, content, draft, tag })
      .eq('id', id);
    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Post updated', data });
  } else {
    const { data, error: insertError } = await supabase
      .from('posts')
      .insert([{ title, content, draft, tag }]);
    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Post created', data });
  }
}