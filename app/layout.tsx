import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Nav from './components/Nav'
import ViewportHeight from './components/ViewportHeight'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fieldsite — The world of general aviation',
  description:
    'Discover airports, share field notes, and connect with pilots. Fieldsite is the social app for general aviation.',
  openGraph: {
    title: 'Fieldsite',
    description: 'The social app for general aviation pilots.',
    siteName: 'Fieldsite',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased" style={{ margin: 0, padding: 0 }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 50 }}>
          <Nav />
        </div>
        <ViewportHeight />
        <div id="page-content">
          {children}
        </div>
      </body>
    </html>
  )
}
