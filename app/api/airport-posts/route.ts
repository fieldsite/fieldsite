import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, content, created_at')
    .order('created_at', { ascending: false })
    .limit(3)

  if (error) return NextResponse.json([], { status: 500 })

  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, max-age=120, stale-while-revalidate=60' },
  })
}
