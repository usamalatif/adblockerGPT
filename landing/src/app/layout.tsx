import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'adblockerGPT - Block Ads on ChatGPT | Free Chrome Extension',
  description: 'Remove all ads from ChatGPT instantly. adblockerGPT is a free, lightweight Chrome extension that blocks sponsored content and ads on ChatGPT. Zero data collection, 100% privacy focused.',
  keywords: 'chatgpt ad blocker, block ads chatgpt, remove chatgpt ads, chatgpt without ads, ad free chatgpt, chatgpt sponsored content blocker, chrome extension chatgpt, openai ad blocker, chatgpt privacy extension',
  authors: [{ name: 'adblockerGPT Team' }],
  creator: 'adblockerGPT',
  publisher: 'adblockerGPT',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://adblockergpt.com',
    siteName: 'adblockerGPT',
    title: 'adblockerGPT - Block Ads on ChatGPT | Free Chrome Extension',
    description: 'Remove all ads from ChatGPT instantly. Free, lightweight, and privacy-focused Chrome extension.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'adblockerGPT - Ad-Free ChatGPT Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'adblockerGPT - Block Ads on ChatGPT',
    description: 'Remove all ads from ChatGPT instantly. Free Chrome extension.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://adblockergpt.com" />
        <meta name="theme-color" content="#10a37f" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
