'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const TABS = [
  { label: 'MAP', href: '/' },
  { label: 'ABOUT', href: '/about' },
{ label: 'CONTACT', href: '/contact' },
  { label: 'PRIVACY POLICY', href: '/privacy' },
]


export default function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header style={{ background: 'var(--bg-nav)', borderBottom: '1px solid var(--border)' }}>
      <div
        style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px', height: 64, position: 'relative' }}
        className="flex items-center justify-between gap-6"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-0 shrink-0 justify-center"
          style={{ color: '#fdfcf8', width: 336, marginLeft: -24 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/windsock2.png" alt="" width={92} height={92} style={{ objectFit: 'contain' }} />
          <span
            className="font-semibold text-sm"
            style={{ letterSpacing: '0.22em', textTransform: 'uppercase' }}
          >
            Fieldsite
          </span>
        </Link>

        {/* Desktop tabs */}
        <nav className="hidden lg:flex items-end gap-0" style={{ height: 64, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          {TABS.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex items-center px-4 text-xs font-semibold tracking-widest transition-colors"
              style={{
                height: '100%',
                color: isActive(tab.href) ? '#fdfcf8' : '#ddd2bc',
                borderBottom: isActive(tab.href)
                  ? '2px solid var(--accent)'
                  : '2px solid transparent',
              }}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Download button */}
        <div className="hidden lg:flex items-center shrink-0">
          <a
            href="https://apps.apple.com/app/fieldsite/id6745740360"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 text-xs font-semibold tracking-wide transition-all hover:bg-white/10"
            style={{
              height: 36,
              borderRadius: 8,
              border: '1.5px solid rgba(250, 247, 240, 0.15)',
              color: '#1f3219',
              background: '#fdfcf8',
              textDecoration: 'none',
            }}
          >
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Download
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden px-6 pb-4 flex flex-col gap-1"
          style={{ background: 'var(--bg-nav)', borderTop: '1px solid var(--border)' }}
        >
          {TABS.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm font-semibold tracking-widest border-b transition-colors"
              style={{
                borderColor: 'var(--border)',
                color: isActive(tab.href) ? 'var(--accent)' : 'var(--text-secondary)',
              }}
            >
              {tab.label}
            </Link>
          ))}
          <a
            href="https://apps.apple.com/app/fieldsite/id6745740360"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all"
            style={{ border: '1.5px solid rgba(250, 247, 240, 0.25)', color: '#fdfcf8', background: 'rgba(250, 247, 240, 0.07)', textDecoration: 'none' }}
          >
            Download the App
          </a>
        </div>
      )}
    </header>
  )
}
