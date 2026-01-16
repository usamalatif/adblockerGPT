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
    url: 'https://www.adblockergpt.com',
    siteName: 'adblockerGPT',
    title: 'adblockerGPT - Block Ads on ChatGPT | Free Chrome Extension',
    description: 'Remove all ads from ChatGPT instantly. Free, lightweight, and privacy-focused Chrome extension.',
    images: [
      {
        url: 'https://www.adblockergpt.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'adblockerGPT - Ad-Free ChatGPT Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@OrdinaryWeb3Dev',
    creator: '@OrdinaryWeb3Dev',
    title: 'adblockerGPT - Block Ads on ChatGPT',
    description: 'Remove all ads from ChatGPT instantly. Free Chrome extension.',
    images: ['https://www.adblockergpt.com/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { rel: 'icon', url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://www.adblockergpt.com'),
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'adblockerGPT',
  url: 'https://www.adblockergpt.com',
  logo: 'https://www.adblockergpt.com/apple-touch-icon.png',
  description: 'Free browser extension to block ads on ChatGPT. Privacy-focused, zero data collection.',
  sameAs: [
    'https://x.com/OrdinaryWeb3Dev',
    'https://twitter.com/OrdinaryWeb3Dev',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://x.com/OrdinaryWeb3Dev',
  },
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'adblockerGPT',
  applicationCategory: 'BrowserApplication',
  operatingSystem: 'Chrome, Firefox, Edge, Brave',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    ratingCount: '100',
    bestRating: '5',
    worstRating: '1',
  },
  description: 'Block all ads and sponsored content on ChatGPT. Free, lightweight, and privacy-focused browser extension.',
  downloadUrl: 'https://www.adblockergpt.com',
  softwareVersion: '1.0.0',
  author: {
    '@type': 'Organization',
    name: 'adblockerGPT',
    url: 'https://www.adblockergpt.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.adblockergpt.com" />
        <meta name="theme-color" content="#10a37f" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
