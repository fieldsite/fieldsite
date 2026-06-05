'use client'

import { useEffect } from 'react'

export default function ViewportHeight() {
  useEffect(() => {
    const set = () =>
      document.documentElement.style.setProperty('--vh', window.innerHeight + 'px')
    set()
    window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [])
  return null
}
