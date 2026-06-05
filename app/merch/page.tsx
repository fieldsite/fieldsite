import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Merch — Fieldsite',
  description: 'Fieldsite merchandise — coming soon.',
}

export default function MerchPage() {
  return (
    <main
      className="flex-1 flex flex-col items-center justify-center py-20 px-6 text-center"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-sm flex flex-col items-center gap-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)' }}
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--accent)" strokeWidth="1.5">
            <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Merch</h1>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Fieldsite gear is on the way — hats, shirts, and stickers for the ramp. Check back soon.
        </p>
      </div>
    </main>
  )
}
