'use client'

import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { supabase } from '../lib/supabase'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

interface Airport {
  icao: string
  label: string
  name: string
  city: string
  state: string
  towered: boolean
  tier: number
  lat: number
  lng: number
}

interface MetarRaw {
  icaoId?: string
  flightCategory?: string
  flight_category?: string
  wdir?: number
  wspd?: number
  wgst?: number
  visib?: string
  clouds?: { cover: string; base: number }[]
  altim?: number
}

function getFlightCat(m: MetarRaw): string | undefined {
  return m.flightCategory ?? m.flight_category
}

interface Post {
  id: string
  content: string | null
  created_at: string | null
}

const FLTCAT_COLORS: Record<string, string> = {
  VFR: '#2d6a4f',
  MVFR: '#1d6fa4',
  IFR: '#c1121f',
  LIFR: '#7b2d8b',
}

type MapStyle = 'dark-v11' | 'light-v11'

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return `${Math.floor(diff / 60000)}m ago`
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function addRadarToMap(map: mapboxgl.Map, visible: boolean) {
  if (!map.getSource('nexrad')) {
    map.addSource('nexrad', {
      type: 'raster',
      tiles: ['https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/{z}/{x}/{y}.png'],
      tileSize: 256,
    })
  }
  if (!map.getLayer('nexrad-layer')) {
    map.addLayer({
      id: 'nexrad-layer',
      type: 'raster',
      source: 'nexrad',
      paint: { 'raster-opacity': 0.65 },
      layout: { visibility: visible ? 'visible' : 'none' },
    })
  }
}

function styleAirportLayers(map: mapboxgl.Map) {
  const aerowayLayers = map.getStyle()?.layers?.filter(l => l.id.includes('aeroway') || l.id.includes('airport')) ?? []
  for (const layer of aerowayLayers) {
    if (layer.type === 'fill') {
      map.setPaintProperty(layer.id, 'fill-color', 'rgba(255, 255, 255, 0.15)')
    } else if (layer.type === 'line') {
      map.setPaintProperty(layer.id, 'line-color', 'rgba(255, 255, 255, 0.5)')
    }
  }
}

const TIER_MIN_ZOOM: Record<number, number> = { 1: 0, 2: 7, 3: 9 }

function buildRefreshMarkers(
  map: mapboxgl.Map,
  airports: Airport[],
  markers: Map<string, mapboxgl.Marker>,
  onSelect: (a: Airport) => void,
  showAirportsRef: React.MutableRefObject<boolean>,
) {
  return function refresh() {
    if (!showAirportsRef.current) return

    const zoom = map.getZoom()
    const bounds = map.getBounds()
    if (!bounds) return

    const pad = 1.5
    const visible = new Set(
      airports
        .filter(a =>
          zoom >= TIER_MIN_ZOOM[a.tier] &&
          a.lng > bounds.getWest() - pad && a.lng < bounds.getEast() + pad &&
          a.lat > bounds.getSouth() - pad && a.lat < bounds.getNorth() + pad
        )
        .map(a => a.icao)
    )

    for (const [icao, marker] of markers) {
      if (!visible.has(icao)) { marker.remove(); markers.delete(icao) }
    }

    for (const airport of airports) {
      if (!visible.has(airport.icao) || markers.has(airport.icao)) continue
      const el = document.createElement('div')
      el.className = 'airport-marker'
      el.textContent = airport.label || airport.icao
      el.addEventListener('click', e => { e.stopPropagation(); onSelect(airport) })
      markers.set(
        airport.icao,
        new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat([airport.lng, airport.lat])
          .addTo(map)
      )
    }
  }
}

function MapOptionsPanel({
  mapStyle, onStyleChange,
  showRadar, onRadarToggle,
  showAirports, onAirportsToggle,
  onClose,
}: {
  mapStyle: MapStyle
  onStyleChange: (s: MapStyle) => void
  showRadar: boolean
  onRadarToggle: (v: boolean) => void
  showAirports: boolean
  onAirportsToggle: (v: boolean) => void
  onClose: () => void
}) {
  const styles: { id: MapStyle; label: string; icon: React.ReactNode }[] = [
    {
      id: 'dark-v11', label: 'Dark',
      icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinejoin="round" strokeLinecap="round"/></svg>,
    },
    {
      id: 'light-v11', label: 'Light',
      icon: <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="4"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" strokeLinecap="round"/></svg>,
    },
  ]

  return (
    <div style={{
      position: 'absolute',
      top: 82,
      right: 46,
      zIndex: 20,
      width: 220,
      background: '#0f2318',
      borderRadius: 14,
      border: '1px solid rgba(245,240,232,0.1)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 14px 10px',
        borderBottom: '1px solid rgba(245,240,232,0.07)',
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#faf7f2' }}>Map Options</span>
        <button onClick={onClose} style={{
          width: 22, height: 22, borderRadius: '50%',
          background: 'rgba(245,240,232,0.1)', border: 'none',
          color: '#d2c2a4', fontSize: 15, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
        }}>×</button>
      </div>

      <div style={{ padding: '10px 14px 12px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#6a7a60', marginBottom: 8, textTransform: 'uppercase' }}>
          Style
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {styles.map(s => (
            <button
              key={s.id}
              onClick={() => onStyleChange(s.id)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                padding: '10px 8px', borderRadius: 10, cursor: 'pointer',
                background: mapStyle === s.id ? 'rgba(245,240,232,0.14)' : 'rgba(245,240,232,0.05)',
                border: mapStyle === s.id ? '1.5px solid rgba(245,240,232,0.3)' : '1.5px solid rgba(245,240,232,0.08)',
                color: mapStyle === s.id ? '#faf7f2' : '#8a9a80',
                transition: 'all 0.15s',
              }}
            >
              {s.icon}
              <span style={{ fontSize: 11, fontWeight: 600 }}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(245,240,232,0.07)',
        padding: '10px 14px 14px',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#6a7a60', textTransform: 'uppercase' }}>
          Overlays
        </div>

        {/* Airport pins toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'rgba(245,240,232,0.07)',
              border: '1px solid rgba(245,240,232,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#a0b090', flexShrink: 0,
            }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#faf7f2', lineHeight: 1.2 }}>Airport Pins</div>
              <div style={{ fontSize: 10, color: '#6a7a60', marginTop: 1 }}>Show airports on map</div>
            </div>
          </div>
          <button
            onClick={() => onAirportsToggle(!showAirports)}
            style={{
              width: 40, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
              background: showAirports ? '#3d6b4a' : 'rgba(245,240,232,0.12)',
              position: 'relative', transition: 'background 0.2s', flexShrink: 0,
            }}
          >
            <div style={{
              width: 18, height: 18, borderRadius: '50%', background: '#faf7f2',
              position: 'absolute', top: 3,
              left: showAirports ? 19 : 3,
              transition: 'left 0.2s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }} />
          </button>
        </div>

        {/* NEXRAD radar toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'rgba(245,240,232,0.07)',
              border: '1px solid rgba(245,240,232,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#a0b090', flexShrink: 0,
            }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M20 17.58A5 5 0 0018 8h-1.26A8 8 0 104 16.25"/>
                <line x1="8" y1="19" x2="8" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="19"/>
                <line x1="16" y1="19" x2="16" y2="21"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#faf7f2', lineHeight: 1.2 }}>NEXRAD Radar</div>
              <div style={{ fontSize: 10, color: '#6a7a60', marginTop: 1 }}>Updates every ~5 min</div>
            </div>
          </div>
          <button
            onClick={() => onRadarToggle(!showRadar)}
            style={{
              width: 40, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
              background: showRadar ? '#3d6b4a' : 'rgba(245,240,232,0.12)',
              position: 'relative', transition: 'background 0.2s', flexShrink: 0,
            }}
          >
            <div style={{
              width: 18, height: 18, borderRadius: '50%', background: '#faf7f2',
              position: 'absolute', top: 3,
              left: showRadar ? 19 : 3,
              transition: 'left 0.2s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }} />
          </button>
        </div>
      </div>
    </div>
  )
}

function AirportCard({ airport, onClose }: { airport: Airport; onClose: () => void }) {
  const [metar, setMetar] = useState<MetarRaw | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [metarLoading, setMetarLoading] = useState(true)

  useEffect(() => {
    setMetar(null)
    setPosts([])
    setMetarLoading(true)

    fetch(`/api/metar?icao=${airport.icao}`)
      .then(r => r.json())
      .then((data: MetarRaw[]) => { if (data?.[0]) setMetar(data[0]) })
      .catch(() => {})
      .finally(() => setMetarLoading(false))

    supabase
      .from('posts')
      .select('id, content, created_at')
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => { if (data) setPosts(data as Post[]) })
  }, [airport.icao])

  const windStr = metar?.wdir != null && metar?.wspd != null
    ? `${String(metar.wdir).padStart(3, '0')}° ${metar.wspd}kt${metar.wgst ? ` G${metar.wgst}` : ''}`
    : null
  const visStr = metar?.visib ? `${metar.visib}SM` : null
  const cloudStr = metar?.clouds?.length ? `${metar.clouds[0].cover}${metar.clouds[0].base}` : null
  const altStr = metar?.altim ? `${metar.altim.toFixed(2)}"` : null
  const metarParts = [windStr, visStr, cloudStr, altStr].filter(Boolean)

  return (
    <div style={{
      position: 'absolute',
      bottom: 20,
      right: 16,
      zIndex: 10,
      width: 300,
      background: '#0f2318',
      borderRadius: 16,
      boxShadow: '0 8px 48px rgba(0,0,0,0.65)',
      border: '1px solid rgba(245,240,232,0.1)',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '16px 16px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#d2c2a4', marginBottom: 3 }}>
              {airport.label}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#faf7f2', lineHeight: 1.2 }}>
              {airport.name}
            </div>
            <div style={{ fontSize: 12, color: '#8a9e80', marginTop: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 1a3.5 3.5 0 010 7C4 8 1.5 5.5 6 1z" /><circle cx="6" cy="4.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              {airport.city}, {airport.state}
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 24, height: 24, borderRadius: '50%',
            background: 'rgba(245,240,232,0.1)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#d2c2a4', fontSize: 16, lineHeight: 1, flexShrink: 0,
          }}>×</button>
        </div>

      </div>

      <div style={{
        margin: '0 16px 12px', padding: '8px 12px', borderRadius: 10,
        background: 'rgba(245,240,232,0.05)', border: '1px solid rgba(245,240,232,0.08)',
        display: 'flex', alignItems: 'center', gap: 8, minHeight: 34,
      }}>
        {metarLoading ? (
          <span style={{ fontSize: 11, color: '#6a7a60' }}>Loading weather…</span>
        ) : metar ? (
          <>
            {getFlightCat(metar) && (
              <span style={{
                background: FLTCAT_COLORS[getFlightCat(metar)!] ?? '#444',
                color: '#fff', borderRadius: 20, padding: '2px 8px',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', flexShrink: 0,
              }}>{getFlightCat(metar)}</span>
            )}
            <span style={{ fontSize: 11, color: '#a0b090', fontFamily: 'ui-monospace, monospace', lineHeight: 1.4 }}>
              {metarParts.join(' · ')}
            </span>
          </>
        ) : (
          <span style={{ fontSize: 11, color: '#6a7a60' }}>Weather unavailable</span>
        )}
      </div>

      {posts.length > 0 && (
        <>
          <div style={{ borderTop: '1px solid rgba(245,240,232,0.07)', margin: '0 0 10px' }} />
          <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
            {posts.map(post => (
              <div key={post.id}>
                <p style={{
                  fontSize: 12, color: '#ddd2bc', margin: '0 0 2px', lineHeight: 1.4,
                  display: '-webkit-box', WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {post.content ?? 'Field note'}
                </p>
                {post.created_at && (
                  <span style={{ fontSize: 10, color: '#5a6a50' }}>{timeAgo(post.created_at)}</span>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <div style={{ borderTop: '1px solid rgba(245,240,232,0.07)' }}>
        <a
          href="https://apps.apple.com/app/fieldsite/id6745740360"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 16px', textDecoration: 'none',
            color: '#d2c2a4', fontSize: 13, fontWeight: 600,
          }}
        >
          View Airport in App
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function MapboxMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const showRadarRef = useRef(false)
  const styleInitialized = useRef(false)
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map())
  const refreshMarkersRef = useRef<(() => void) | null>(null)
  const showAirportsRef = useRef(true)
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null)
  const [showOptions, setShowOptions] = useState(false)
  const [mapStyle, setMapStyle] = useState<MapStyle>('dark-v11')
  const [showRadar, setShowRadar] = useState(false)
  const [showAirports, setShowAirports] = useState(true)

  useEffect(() => { showRadarRef.current = showRadar }, [showRadar])
  useEffect(() => { showAirportsRef.current = showAirports }, [showAirports])

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-98, 38],
      zoom: 3.8,
      attributionControl: false,
      logoPosition: 'bottom-right',
    })

    map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')

    mapRef.current = map

    map.on('load', async () => {
      addRadarToMap(map, false)
      styleAirportLayers(map)

      // Load all public US airports and manage DOM markers by viewport
      try {
        const res = await fetch('/api/airports')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const geojson = await res.json() as {
          features: Array<{
            geometry: { coordinates: [number, number] }
            properties: { icao: string; label: string; name: string; city: string; state: string; towered: boolean; tier: number }
          }>
        }

        const airports: Airport[] = geojson.features.map(f => ({
          icao: f.properties.icao,
          label: String(f.properties.label || f.properties.icao || ''),
          name: f.properties.name,
          city: f.properties.city,
          state: f.properties.state,
          towered: f.properties.towered,
          tier: f.properties.tier,
          lat: f.geometry.coordinates[1],
          lng: f.geometry.coordinates[0],
        }))

        // Add airport highlight rings as a native GL layer
        map.addSource('airports-data', {
          type: 'geojson',
          data: geojson as GeoJSON.FeatureCollection,
        })

        const tierMinZooms: [number, number][] = [[1, 0], [2, 7], [3, 9]]
        for (const [tier, minZoom] of tierMinZooms) {
          map.addLayer({
            id: `airport-ring-${tier}`,
            type: 'circle',
            source: 'airports-data',
            minzoom: minZoom,
            filter: ['==', ['get', 'tier'], tier],
            paint: {
              'circle-radius': ['interpolate', ['linear'], ['zoom'], minZoom, 3, minZoom + 4, 7],
              'circle-color': 'rgba(0,0,0,0)',
              'circle-stroke-width': 1.5,
              'circle-stroke-color': 'rgba(255,255,255,0.55)',
              'circle-opacity': ['interpolate', ['linear'], ['zoom'], minZoom, 0, minZoom + 1.5, 1],
              'circle-stroke-opacity': ['interpolate', ['linear'], ['zoom'], minZoom, 0, minZoom + 1.5, 1],
            },
          })
        }

        const markers = markersRef.current
        const refresh = buildRefreshMarkers(map, airports, markers, setSelectedAirport, showAirportsRef)
        refreshMarkersRef.current = refresh
        map.on('zoom', refresh)
        map.on('moveend', refresh)
        refresh()
      } catch (e) {
        console.error('Airport load failed:', e)
      }

      // Post markers
      try {
        const { data: posts } = await supabase
          .from('posts')
          .select('id, content, latitude, longitude')
          .not('latitude', 'is', null)
          .not('longitude', 'is', null)
          .limit(200)

        if (posts) {
          for (const post of posts) {
            if (!post.latitude || !post.longitude) continue
            const el = document.createElement('div')
            el.className = 'post-marker'
            new mapboxgl.Marker({ element: el })
              .setLngLat([post.longitude, post.latitude])
              .addTo(map)
          }
        }
      } catch { /* posts optional */ }
    })

    return () => { map.remove(); mapRef.current = null }
  }, [])

  // Handle map style changes — skip initial mount, re-add only radar after style loads
  // (DOM markers survive style changes automatically)
  useEffect(() => {
    if (!styleInitialized.current) { styleInitialized.current = true; return }
    const map = mapRef.current
    if (!map) return
    map.setStyle(`mapbox://styles/mapbox/${mapStyle}`)
    map.once('style.load', () => { addRadarToMap(map, showRadarRef.current); styleAirportLayers(map) })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapStyle])

  // Handle radar toggle
  useEffect(() => {
    const map = mapRef.current
    if (!map?.getLayer('nexrad-layer')) return
    map.setLayoutProperty('nexrad-layer', 'visibility', showRadar ? 'visible' : 'none')
  }, [showRadar])

  // Handle airport pins toggle
  useEffect(() => {
    const map = mapRef.current
    const visibility = showAirports ? 'visible' : 'none'
    for (let tier = 1; tier <= 3; tier++) {
      if (map?.getLayer(`airport-ring-${tier}`)) {
        map.setLayoutProperty(`airport-ring-${tier}`, 'visibility', visibility)
      }
    }
    if (showAirports) {
      refreshMarkersRef.current?.()
    } else {
      for (const marker of markersRef.current.values()) marker.remove()
      markersRef.current.clear()
      setSelectedAirport(null)
    }
  }, [showAirports])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {/* Layers button — below Mapbox zoom controls */}
      <button onClick={() => setShowOptions(o => !o)} title="Map Options" style={{
        position: 'absolute', top: 88, right: 10, zIndex: 15,
        width: 34, height: 34, borderRadius: 4,
        background: showOptions ? 'rgba(245,240,232,0.18)' : '#0e1a16',
        border: '1px solid rgba(245,240,232,0.15)',
        color: '#ffffff', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
      }}>
        <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="16" height="3" rx="1"/>
          <rect x="2" y="8.5" width="16" height="3" rx="1"/>
          <rect x="2" y="14" width="16" height="3" rx="1"/>
        </svg>
      </button>

      {showOptions && (
        <MapOptionsPanel
          mapStyle={mapStyle}
          onStyleChange={(s) => { setMapStyle(s) }}
          showRadar={showRadar}
          onRadarToggle={setShowRadar}
          showAirports={showAirports}
          onAirportsToggle={setShowAirports}
          onClose={() => setShowOptions(false)}
        />
      )}

      {selectedAirport && (
        <AirportCard
          airport={selectedAirport}
          onClose={() => setSelectedAirport(null)}
        />
      )}
    </div>
  )
}
