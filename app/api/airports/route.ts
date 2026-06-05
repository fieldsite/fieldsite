import { NextResponse } from 'next/server'


function parseCSVRow(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  for (const char of line) {
    if (char === '"') { inQuotes = !inQuotes }
    else if (char === ',' && !inQuotes) { result.push(current); current = '' }
    else { current += char }
  }
  result.push(current)
  return result
}

export async function GET() {
  const res = await fetch(
    'https://davidmegginson.github.io/ourairports-data/airports.csv',
    { next: { revalidate: 86400 } }
  )

  const text = await res.text()
  const lines = text.split('\n')
  const headers = parseCSVRow(lines[0])

  const features: object[] = []

  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVRow(lines[i])
    if (row.length < headers.length) continue

    const obj: Record<string, string> = {}
    headers.forEach((h, idx) => { obj[h] = (row[idx] ?? '').trim() })

    if (obj.iso_country !== 'US') continue
    if (!['large_airport', 'medium_airport', 'small_airport'].includes(obj.type)) continue
    if (!obj.ident || !obj.latitude_deg || !obj.longitude_deg) continue
    // Skip airports without a K-prefix ICAO (private strips, etc.)
    if (!obj.ident.startsWith('K') || obj.ident.length !== 4) continue

    const lat = parseFloat(obj.latitude_deg)
    const lng = parseFloat(obj.longitude_deg)
    if (isNaN(lat) || isNaN(lng)) continue

    // Proper ICAOs are K + 3 uppercase letters (KATL, KORD). Everything else
    // is a non-standard FAA identifier stored with a K prefix — strip it.
    const label = /^K[A-Z]{3}$/.test(obj.ident) ? obj.ident : obj.ident.slice(1)

    // Tier 1: major commercial airports (large + IATA code ≈ Class B/C)
    // Tier 2: other large airports + medium airports
    // Tier 3: small airports
    let tier: number
    if (obj.type === 'large_airport' && obj.iata_code?.trim()) {
      tier = 1
    } else if (obj.type === 'large_airport' || obj.type === 'medium_airport') {
      tier = 2
    } else {
      tier = 3
    }

    features.push({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [lng, lat] },
      properties: {
        icao: obj.ident,
        label,
        name: obj.name,
        city: obj.municipality ?? '',
        state: (obj.iso_region ?? '').replace('US-', ''),
        type: obj.type,
        tier,
        towered: obj.type === 'large_airport',
        flightCategory: null,
      },
    })
  }

  return NextResponse.json(
    { type: 'FeatureCollection', features },
    { headers: { 'Cache-Control': 'public, max-age=3600' } }
  )
}
