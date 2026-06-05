import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Fieldsite',
  description: 'Fieldsite is a social app built for the general aviation community.',
}

export default function AboutPage() {
  return (
    <main className="flex-1 py-16 px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div
            className="text-xs font-bold tracking-[0.2em] uppercase"
            style={{ color: 'var(--accent)' }}
          >
            About Fieldsite
          </div>
          <h1 className="text-4xl font-bold leading-tight text-[var(--text-primary)]">
            Built by pilots, for pilots.
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Fieldsite was created around a simple belief: every airport has a story.
          </p>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            From small-town fly-ins and hidden grass strips to unforgettable cross-country stops, general aviation is full of experiences worth sharing. Fieldsite gives pilots a place to discover airports, exchange local knowledge, and connect with the people who make aviation special.
          </p>
        </div>

        <div
          className="rounded-2xl p-8 flex flex-col gap-6"
          style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)' }}
        >
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">What you&apos;ll find on Fieldsite</h2>
          <div className="flex flex-col gap-5">
            {[
              {
                title: 'Field Notes & Community',
                body: 'Share photos, stories, and field notes from the places you fly. Discover what other pilots are experiencing at airports across the country.',
              },
              {
                title: 'Interactive Airport Map',
                body: 'Explore airports through a living map powered by the community. View airport information, field notes, photos, weather, and local insights all in one place.',
              },
              {
                title: 'Pilot Network',
                body: 'Follow fellow aviators, build your profile, and connect with pilots who share your passion for exploration and flight.',
              },
              {
                title: 'Community Fuel Reports',
                body: 'Access pilot-submitted fuel prices and airport updates from the people who were there most recently.',
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-1.5">
                <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Fieldsite is available on iOS. Have questions or feedback? We&apos;d love to hear from you.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/download"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ background: '#f5f0e8', color: '#0f2318' }}
            >
              Download the App
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-[var(--text-primary)] transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              Contact us →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
