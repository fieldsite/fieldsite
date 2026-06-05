import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const icao = request.nextUrl.searchParams.get('icao')
  if (!icao) return NextResponse.json({ error: 'Missing icao' }, { status: 400 })

  const res = await fetch(
    `https://aviationweather.gov/api/data/metar?ids=${icao.toUpperCase()}&format=json`,
    { next: { revalidate: 300 } }
  )

  if (!res.ok) return NextResponse.json([], { status: 200 })

  const data = await res.json()
  return NextResponse.json(data)
}
