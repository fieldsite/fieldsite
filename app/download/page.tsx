import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Download — Fieldsite',
  description: 'Download Fieldsite for iPhone and discover the world of general aviation.',
}

export default function DownloadPage() {
  return (
    <main
      className="flex-1 flex flex-col items-center justify-center py-20 px-6 text-center"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-md flex flex-col items-center gap-8">
        {/* App icon placeholder */}
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl"
          style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)' }}
        >
          <svg viewBox="0 0 20 20" width="40" height="40" fill="none" aria-hidden="true">
            <line x1="5" y1="1" x2="5" y2="19" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5 3.5 L18 6.5 L15 12 L5 12 Z" fill="var(--accent)" />
          </svg>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Fieldsite</h1>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            The social app for general aviation. Discover airports, share field notes, and connect with
            pilots across the country.
          </p>
        </div>

        <a
          href="https://apps.apple.com/app/fieldsite/id6776333020"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl border transition-all hover:border-[var(--accent)] hover:bg-[var(--bg-surface)] group"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" className="text-[var(--text-primary)] shrink-0">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          <div className="text-left">
            <div className="text-xs leading-none mb-1" style={{ color: 'var(--text-secondary)' }}>Download on the</div>
            <div className="text-xl font-semibold text-[var(--text-primary)] leading-none">App Store</div>
          </div>
        </a>

        <div className="flex flex-col gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <span>Free · iOS 16.0 or later · iPhone</span>
        </div>
      </div>
    </main>
  )
}
