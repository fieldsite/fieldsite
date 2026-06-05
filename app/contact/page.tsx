import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Fieldsite',
  description: 'Get in touch with the Fieldsite team.',
}

export default function ContactPage() {
  return (
    <main className="flex-1 py-16 px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-lg mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div
            className="text-xs font-bold tracking-[0.2em] uppercase"
            style={{ color: 'var(--accent)' }}
          >
            Get in touch
          </div>
          <h1 className="text-4xl font-bold text-[var(--text-primary)]">Contact</h1>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Have a question, found a bug, or want to share feedback? We read everything.
          </p>
        </div>

        <div
          className="rounded-2xl p-8 flex flex-col gap-6"
          style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)' }}
        >
          <div className="flex flex-col gap-1.5">
            <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Email</div>
            <a
              href="mailto:fieldsite.co@gmail.com"
              className="text-base font-medium text-[var(--text-primary)] hover:underline underline-offset-2"
            >
              fieldsite.co@gmail.com
            </a>
            <p className="text-xs leading-relaxed mt-1" style={{ color: 'var(--text-secondary)' }}>
              For support, feedback, partnership inquiries, or anything else.
            </p>
          </div>
        </div>

        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          We typically respond within 1–2 business days.
        </p>
      </div>
    </main>
  )
}
