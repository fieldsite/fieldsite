import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Fieldsite',
  description: 'Privacy Policy for the Fieldsite app and website.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-semibold text-[var(--text-primary)]">{title}</h2>
      <div className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {children}
      </div>
    </div>
  )
}

export default function PrivacyPage() {
  return (
    <main className="flex-1 py-16 px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <div
            className="text-xs font-bold tracking-[0.2em] uppercase"
            style={{ color: 'var(--accent)' }}
          >
            Legal
          </div>
          <h1 className="text-4xl font-bold text-[var(--text-primary)]">Privacy Policy</h1>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Effective date: June 3, 2026 · Last updated: June 3, 2026
          </p>
        </div>

        <div
          className="rounded-2xl p-8 flex flex-col gap-8"
          style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)' }}
        >
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Fieldsite ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, and share information when you use the Fieldsite mobile
            application and website (collectively, the "Services").
          </p>

          <Section title="Information We Collect">
            <ul className="flex flex-col gap-2 list-none">
              <li><strong className="text-[var(--text-primary)]">Account information:</strong> When you create an account, we collect your email address and the username you choose.</li>
              <li className="mt-1"><strong className="text-[var(--text-primary)]">Profile information:</strong> Profile photos and header images you voluntarily upload.</li>
              <li className="mt-1"><strong className="text-[var(--text-primary)]">Content you post:</strong> Text, photos, and location data associated with posts you publish.</li>
              <li className="mt-1"><strong className="text-[var(--text-primary)]">Location:</strong> With your permission, we use your device's location to show nearby airports and posts. We do not store continuous location history.</li>
              <li className="mt-1"><strong className="text-[var(--text-primary)]">Usage data:</strong> Basic analytics about how you use the app (e.g., screens visited). We do not sell this data.</li>
            </ul>
          </Section>

          <Section title="How We Use Your Information">
            <ul className="flex flex-col gap-2 list-none">
              <li>To provide and operate the Services, including displaying nearby airports and community posts.</li>
              <li className="mt-1">To authenticate your account and keep it secure.</li>
              <li className="mt-1">To send you notifications you have opted into (e.g., when someone follows you or likes your post).</li>
              <li className="mt-1">To improve the Services based on aggregate usage patterns.</li>
            </ul>
          </Section>

          <Section title="Sharing of Information">
            <p>
              We do not sell your personal information. Content you post (text, photos) is visible to other
              Fieldsite users as part of the public social feed. Your email address is never publicly
              displayed.
            </p>
            <p className="mt-2">
              We use Supabase (supabase.com) to store account and post data, and Mapbox (mapbox.com) for
              map functionality. Both are subject to their respective privacy policies.
            </p>
          </Section>

          <Section title="Data Retention">
            <p>
              We retain your data for as long as your account is active. You may request deletion of your
              account and associated data at any time by contacting us at fieldsite.co@gmail.com. We will
              process deletion requests within 30 days.
            </p>
          </Section>

          <Section title="Children's Privacy">
            <p>
              Fieldsite is not directed to children under 13. We do not knowingly collect personal
              information from children under 13. If you believe a child has provided us with personal
              information, please contact us and we will delete it promptly.
            </p>
          </Section>

          <Section title="Your Rights">
            <p>
              You may access, correct, or delete your personal information through the app's account
              settings or by contacting us. If you are a California resident, you have additional rights
              under the CCPA, including the right to know what data we collect and the right to opt out of
              the sale of personal information (we do not sell personal information).
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. If we make material changes, we will
              notify you through the app or by email. Continued use of the Services after changes
              constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about this Privacy Policy? Reach us at{' '}
              <a
                href="mailto:fieldsite.co@gmail.com"
                className="text-[var(--text-primary)] hover:underline underline-offset-2"
              >
                fieldsite.co@gmail.com
              </a>
              .
            </p>
          </Section>
        </div>
      </div>
    </main>
  )
}
