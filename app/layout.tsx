import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Minimalist Blog',
  description: 'A clean, typography-focused blog for thoughtful writing',
  keywords: ['blog', 'minimalist', 'writing', 'articles'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Minimalist Blog',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
