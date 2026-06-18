import Link from 'next/link'
import MapboxMapWrapper from './components/MapboxMapWrapper'

function PilotIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" />
    </svg>
  )
}

function NotesIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  )
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" />
    </svg>
  )
}

function ExploreIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  )
}

function FieldNotesIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

function ConnectIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" />
    </svg>
  )
}

function WindsockBig() {
  return (
    <svg viewBox="0 0 60 60" width="60" height="60" fill="none" aria-hidden="true">
      <line x1="12" y1="4" x2="12" y2="56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="10" x2="30" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 7 L54 13 L48 24 L30 24 Z" fill="currentColor" opacity="0.8" />
      <line x1="40" y1="7.8" x2="38" y2="23.2" stroke="white" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
      <line x1="47" y1="10" x2="44" y2="23.5" stroke="white" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
    </svg>
  )
}

function SidebarContent() {
  return (
    <>
      {/* Top half */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
        {/* Tagline */}
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#eedfc8', margin: 0, textAlign: 'center' }}>
          Explore.&nbsp; Discover.&nbsp; Share.
        </p>

        {/* Heading + subheading */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.375rem)', fontWeight: 800, lineHeight: 1.1, color: '#fdfcf8', margin: 0, letterSpacing: '-0.02em' }}>
            Every airport<br />has a story.
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: '#d8cbb3', margin: 0 }}>Share yours...</p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <a
            href="https://apps.apple.com/app/fieldsite/id6776333020"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 8, border: '1.5px solid rgba(250, 247, 240, 0.15)', color: '#1f3219', fontSize: 13, fontWeight: 600, textDecoration: 'none', background: '#fdfcf8' }}
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Download the App
          </a>
          <a
            href="/about"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 13px', borderRadius: 8, border: '1.5px solid rgba(232, 217, 190, 0.45)', color: '#eedfc8', fontSize: 11, fontWeight: 600, textDecoration: 'none', background: 'rgba(200, 184, 154, 0.07)' }}
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Bottom half */}
      <div style={{ borderTop: '1px solid rgba(237, 232, 218, 0.12)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: '#d8cbb3', margin: 0 }}>
          Fieldsite is a community built for pilots. Discover airports, share field notes, and connect with fellow aviators across the country.
        </p>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: '#d8cbb3', margin: 0 }}>
          Every airport has a story.<br /><br />Find yours.
        </p>
      </div>
    </>
  )
}

export default function Home() {
  return (
    <>
      {/* ── Outer: everything fits in one viewport ── */}
      <div style={{ height: 'calc(var(--vh, 100svh) - 4rem)', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>

      {/* ── Hero: map + panel ── */}
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
        {/* Map fills entire hero */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <MapboxMapWrapper />
        </div>

        {/* ── Desktop sidebar (lg+) ── */}
        <aside
          className="hidden lg:flex"
          style={{
            position: 'absolute',
            left: 24,
            top: 24,
            bottom: 24,
            width: 'min(336px, calc(100% - 48px))',
            background: 'rgba(15, 35, 24, 0.92)',
            backdropFilter: 'blur(6px)',
            borderRadius: 16,
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2rem 1.6rem',
            border: 'none',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            overflowY: 'auto',
          }}
        >
          <SidebarContent />
        </aside>

      </div>

      {/* ── Bottom dock bar ── */}
      <section style={{ background: '#ede8da', borderTop: '1px solid #ddd8cc', flexShrink: 0 }}>
        {/* Desktop layout */}
        <div
          className="hidden lg:grid desktop-only"
          style={{ maxWidth: 1440, margin: '0 auto', padding: '1.75rem 2rem', gridTemplateColumns: '220px 1fr auto', gap: '1.5rem', alignItems: 'center' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#1a3028', lineHeight: 1.3, margin: 0 }}>A community that loves aviation as much as you do.</p>
            <p style={{ fontSize: 13, fontStyle: 'italic', color: '#4d7a40', margin: 0, fontWeight: 500 }}>See you out there.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {[
              { icon: <ExploreIcon />, title: 'EXPLORE', text: 'Discover airports, FBOs, and points of interest.' },
              { icon: <FieldNotesIcon />, title: 'FIELD NOTES', text: 'Read real pilot notes from the community.' },
              { icon: <ShareIcon />, title: 'SHARE', text: 'Contribute photos and updates for fellow pilots.' },
              { icon: <ConnectIcon />, title: 'CONNECT', text: 'Join a growing community of pilots.' },
            ].map((f) => (
              <div key={f.title} style={{ padding: '0 1.25rem', borderLeft: '1px solid #d0c8bc', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ color: '#3a5838' }}>{f.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#1a3028' }}>{f.title}</div>
                <p style={{ fontSize: 11, color: '#5a7060', lineHeight: 1.45, margin: 0 }}>{f.text}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
            <span style={{ fontSize: 11, color: '#6a7a68' }}>© {new Date().getFullYear()} Fieldsite</span>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[{ label: 'Privacy', href: '/privacy' }, { label: 'Contact', href: '/contact' }, { label: 'Download', href: '/download' }].map(({ label, href }) => (
                <Link key={href} href={href} style={{ fontSize: 11, color: '#6a7a68', textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: tagline + download */}
        <div className="lg:hidden mobile-only" style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#1a3028', margin: 0, lineHeight: 1.3 }}>Every airport<br />has a story.</p>
          <a
            href="https://apps.apple.com/app/fieldsite/id6776333020"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 14px', borderRadius: 8, background: '#1a3028', color: '#fdfcf8', fontSize: 12, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Download the App
          </a>
        </div>
      </section>

      </div>{/* end outer viewport wrapper */}
    </>
  )
}
