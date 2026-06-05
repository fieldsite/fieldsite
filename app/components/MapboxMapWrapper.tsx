'use client'

import dynamic from 'next/dynamic'

const MapboxMap = dynamic(() => import('./MapboxMap'), { ssr: false })

export default function MapboxMapWrapper() {
  return <MapboxMap />
}
