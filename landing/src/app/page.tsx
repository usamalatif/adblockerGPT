'use client'

import { useState, useEffect } from 'react'

// Browser detection types
type BrowserType = 'chrome' | 'firefox' | 'edge' | 'safari' | 'opera' | 'unknown'

interface BrowserInfo {
  type: BrowserType
  name: string
  icon: JSX.Element
  storeUrl: string
  supported: boolean
}

// Icons as SVG components
const ShieldIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const BoltIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const EyeOffIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
)

const CodeIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-5 h-5 text-chatgpt-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const XIcon = () => (
  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ChromeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-3.952 6.848a12.014 12.014 0 0 0 9.229-4.83A11.947 11.947 0 0 0 24 12c0-.653-.055-1.293-.147-1.918H12.87c.808.394 1.552.927 2.403 1.554z"/>
  </svg>
)

const FirefoxIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <img src="/firefox-logo.svg" alt="Firefox" className={className} />
)

const EdgeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.86 17.86q.14 0 .25.12.1.13.1.25t-.11.33l-.32.46-.43.53-.44.5q-.21.25-.38.42l-.22.23q-.58.53-1.34 1.04-.76.51-1.6.91-.86.4-1.74.64t-1.67.24q-.9 0-1.69-.28-.8-.28-1.48-.78-.68-.5-1.22-1.17-.53-.66-.92-1.44-.38-.77-.58-1.6-.2-.83-.2-1.67 0-1 .32-1.96.33-.97.87-1.8.14.95.55 1.77.41.81 1.02 1.49.6.68 1.38 1.21.78.54 1.64.9.86.35 1.79.54.92.18 1.85.18h.26q.14 0 .26-.01h.26q1.16 0 2.13-.39.98-.38 1.73-1.1.15-.14.39-.14zm-5.37-8.54q0 .56.14 1.08.14.52.43.97.28.45.71.79.42.34.98.51-.22.14-.58.43-.35.29-.71.7-.35.4-.65.87-.3.48-.48.98-.18.51-.18 1.01 0 .87.4 1.62.4.76 1.02 1.35.63.6 1.43 1 .8.4 1.62.63-.9.18-1.85.18-2.39 0-4.49-.9-2.1-.9-3.67-2.48-1.58-1.57-2.48-3.67-.9-2.1-.9-4.49 0-2.06.69-3.88.68-1.82 1.9-3.2 1.2-1.4 2.87-2.24 1.67-.85 3.64-.93-1.27.86-2.12 2.1-.86 1.24-1.36 2.68-.5 1.43-.72 2.97-.22 1.54-.22 3.04 0 .42.03.8.02.37.08.72z"/>
  </svg>
)

const SafariIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-3.5l-5-10 10 5-5 5zm.5-4a1 1 0 100-2 1 1 0 000 2z"/>
  </svg>
)

// Detect browser type
function detectBrowser(): BrowserType {
  if (typeof window === 'undefined') return 'chrome' // Default for SSR

  const userAgent = navigator.userAgent.toLowerCase()

  if (userAgent.includes('firefox')) return 'firefox'
  if (userAgent.includes('edg')) return 'edge'
  if (userAgent.includes('opr') || userAgent.includes('opera')) return 'opera'
  if (userAgent.includes('safari') && !userAgent.includes('chrome')) return 'safari'
  if (userAgent.includes('chrome')) return 'chrome'

  return 'unknown'
}

// Get browser info based on detected type
function getBrowserInfo(browserType: BrowserType): BrowserInfo {
  const browsers: Record<BrowserType, BrowserInfo> = {
    chrome: {
      type: 'chrome',
      name: 'Chrome',
      icon: <ChromeIcon />,
      storeUrl: 'https://chrome.google.com/webstore/detail/adblockergpt',
      supported: true
    },
    firefox: {
      type: 'firefox',
      name: 'Firefox',
      icon: <FirefoxIcon />,
      storeUrl: 'https://addons.mozilla.org/firefox/addon/adblockergpt',
      supported: true
    },
    edge: {
      type: 'edge',
      name: 'Edge',
      icon: <EdgeIcon />,
      storeUrl: 'https://chrome.google.com/webstore/detail/adblockergpt', // Edge uses Chrome Web Store
      supported: true
    },
    opera: {
      type: 'opera',
      name: 'Opera',
      icon: <ChromeIcon />,
      storeUrl: 'https://chrome.google.com/webstore/detail/adblockergpt', // Opera can use Chrome extensions
      supported: true
    },
    safari: {
      type: 'safari',
      name: 'Safari',
      icon: <SafariIcon />,
      storeUrl: '#',
      supported: false
    },
    unknown: {
      type: 'unknown',
      name: 'Browser',
      icon: <ChromeIcon />,
      storeUrl: 'https://chrome.google.com/webstore/detail/adblockergpt',
      supported: true
    }
  }

  return browsers[browserType]
}

// Install Button Component
function InstallButton({ size = 'default', showBothStores = false }: { size?: 'small' | 'default' | 'large', showBothStores?: boolean }) {
  const [browser, setBrowser] = useState<BrowserInfo | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const detected = detectBrowser()
    setBrowser(getBrowserInfo(detected))
  }, [])

  // Loading state during SSR
  if (!mounted || !browser) {
    return (
      <div className={`bg-chatgpt-green text-white font-semibold rounded-lg flex items-center justify-center gap-2 ${
        size === 'large' ? 'py-4 px-10 text-xl' : size === 'small' ? 'py-2 px-4 text-sm' : 'py-3 px-8'
      }`}>
        <ChromeIcon className={size === 'large' ? 'w-7 h-7' : 'w-6 h-6'} />
        <span>Add to Browser</span>
      </div>
    )
  }

  const sizeClasses = {
    small: 'py-2 px-4 text-sm',
    default: 'py-3 px-8',
    large: 'py-4 px-10 text-xl'
  }

  const iconSize = size === 'large' ? 'w-7 h-7' : 'w-6 h-6'

  // Show both Chrome and Firefox buttons
  if (showBothStores) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
        <a
          href="https://chrome.google.com/webstore/detail/adblockergpt"
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-primary ${sizeClasses[size]} flex items-center justify-center gap-3 glow`}
        >
          <ChromeIcon className={iconSize} />
          Add to Chrome – Free
        </a>
        <a
          href="https://www.buymeacoffee.com/ordinarykai"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#40DCA5] hover:bg-[#35b88a] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          style={{ fontFamily: 'Cookie, cursive' }}
        >
          <span className="text-xl">☕</span>
          Buy me a coffee
        </a>
        <a
          href="https://addons.mozilla.org/firefox/addon/adblockergpt"
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-secondary ${sizeClasses[size]} flex items-center justify-center gap-3`}
        >
          <FirefoxIcon className={iconSize} />
          Add to Firefox – Free
        </a>
      </div>
    )
  }

  // Safari not supported message
  if (!browser.supported) {
    return (
      <div className="text-center">
        <div className={`bg-gray-600 text-white font-semibold rounded-lg ${sizeClasses[size]} flex items-center justify-center gap-3 cursor-not-allowed opacity-75`}>
          {browser.icon}
          <span>{browser.name} Coming Soon</span>
        </div>
        <p className="text-gray-400 text-sm mt-3">
          Available now for{' '}
          <a href="https://chrome.google.com/webstore/detail/adblockergpt" className="text-chatgpt-green hover:underline">Chrome</a>
          {' & '}
          <a href="https://addons.mozilla.org/firefox/addon/adblockergpt" className="text-chatgpt-green hover:underline">Firefox</a>
        </p>
      </div>
    )
  }

  // Dynamic button based on browser
  return (
    <a
      href={browser.storeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-primary ${sizeClasses[size]} flex items-center justify-center gap-3 glow`}
    >
      {browser.icon}
      Add to {browser.name} – It&apos;s Free
    </a>
  )
}

// Navbar Install Button (smaller)
function NavInstallButton() {
  const [browser, setBrowser] = useState<BrowserInfo | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const detected = detectBrowser()
    setBrowser(getBrowserInfo(detected))
  }, [])

  if (!mounted || !browser) {
    return (
      <div className="bg-chatgpt-green text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2">
        <ChromeIcon className="w-5 h-5" />
        <span className="hidden sm:inline">Add to Browser</span>
      </div>
    )
  }

  if (!browser.supported) {
    return (
      <a
        href="https://chrome.google.com/webstore/detail/adblockergpt"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-chatgpt-green hover:bg-chatgpt-green-dark text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2"
      >
        <ChromeIcon className="w-5 h-5" />
        <span className="hidden sm:inline">Get Extension</span>
      </a>
    )
  }

  return (
    <a
      href={browser.storeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-chatgpt-green hover:bg-chatgpt-green-dark text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2"
    >
      {browser.icon}
      <span className="hidden sm:inline">Add to {browser.name}</span>
    </a>
  )
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [browserName, setBrowserName] = useState('Chrome')

  useEffect(() => {
    const browser = getBrowserInfo(detectBrowser())
    setBrowserName(browser.name)
  }, [])

  const features = [
    {
      icon: <ShieldIcon />,
      title: 'Block All ChatGPT Ads',
      description: 'Automatically removes all advertisements and sponsored content from your ChatGPT experience.'
    },
    {
      icon: <EyeOffIcon />,
      title: 'Zero Data Collection',
      description: 'We never collect, store, or transmit any of your data. Your conversations stay completely private.'
    },
    {
      icon: <BoltIcon />,
      title: 'Lightning Fast',
      description: 'Ultra-lightweight at under 50KB. No performance impact on your browser or ChatGPT.'
    },
    {
      icon: <CodeIcon />,
      title: 'Always Free',
      description: 'No premium tiers, no subscriptions, no hidden costs. adblockerGPT is free forever.'
    }
  ]

  const faqs = [
    {
      question: 'Is adblockerGPT completely free?',
      answer: 'Yes, adblockerGPT is 100% free with no hidden costs, premium tiers, or subscriptions. We believe everyone deserves an ad-free ChatGPT experience.'
    },
    {
      question: 'Does adblockerGPT collect my data?',
      answer: 'Absolutely not. We have a strict zero data collection policy. We don\'t track your browsing, conversations, or any personal information. Your privacy is our priority.'
    },
    {
      question: 'Will this slow down my browser?',
      answer: 'No. adblockerGPT is extremely lightweight (under 50KB) and uses minimal resources. You won\'t notice any performance difference.'
    },
    {
      question: 'How do I install adblockerGPT?',
      answer: `Simply click the "Add to ${browserName}" button, then confirm the installation. That's it! The extension activates automatically on ChatGPT.`
    },
    {
      question: 'Is this legal and safe to use?',
      answer: 'Yes. Ad blockers are completely legal. Our extension only runs on ChatGPT pages and doesn\'t modify any other websites or access any of your personal data.'
    },
    {
      question: 'Which browsers are supported?',
      answer: 'adblockerGPT is available for Chrome, Firefox, Edge, Opera, and other Chromium-based browsers. Safari support is coming soon.'
    }
  ]

  const stats = [
    { value: '100K+', label: 'Active Users' },
    { value: '<50KB', label: 'Extension Size' },
    { value: '0', label: 'Data Collected' },
    { value: '4.9★', label: 'User Rating' }
  ]

  return (
    <main className="min-h-screen bg-chatgpt-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-chatgpt-green rounded-lg flex items-center justify-center">
                <ShieldIcon />
              </div>
              <span className="text-xl font-bold text-white">adblockerGPT</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-chatgpt-green transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-chatgpt-green transition-colors">How It Works</a>
              <a href="#comparison" className="text-gray-300 hover:text-chatgpt-green transition-colors">Compare</a>
              <a href="#faq" className="text-gray-300 hover:text-chatgpt-green transition-colors">FAQ</a>
              <a href="/blog" className="text-gray-300 hover:text-chatgpt-green transition-colors">Blog</a>
            </div>
            <NavInstallButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-chatgpt-green/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-chatgpt-green/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chatgpt-teal/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-chatgpt-gray/50 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-chatgpt-green rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">100% Free &amp; Privacy Focused</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="text-white">Ad-Free </span>
            <span className="gradient-text">ChatGPT</span>
            <br />
            <span className="text-white">Completely Free</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Remove all ads and sponsored content from ChatGPT instantly.
            <span className="text-chatgpt-green font-medium"> Zero data collection</span>,
            lightning fast, and completely free.
          </p>

          <div className="mb-12">
            <InstallButton size="large" showBothStores={true} />
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>No Sign Up Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>Works Instantly</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>Uninstall Anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-y border-chatgpt-gray/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-chatgpt-green mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">adblockerGPT</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The most trusted ChatGPT ad blocker with a focus on privacy, performance, and transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="w-14 h-14 bg-chatgpt-green/20 rounded-xl flex items-center justify-center text-chatgpt-green mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section bg-chatgpt-dark/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get Started in <span className="gradient-text">3 Simple Steps</span>
            </h2>
            <p className="text-xl text-gray-400">No configuration needed. Install and forget.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Install Extension', desc: `Click "Add to ${browserName}" and confirm the installation. Takes just 2 seconds.` },
              { step: '2', title: 'Auto-Activation', desc: 'The extension automatically activates when you visit ChatGPT. No setup required.' },
              { step: '3', title: 'Enjoy Ad-Free', desc: 'All ads are blocked instantly. Enjoy pure, distraction-free AI conversations.' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-chatgpt-green rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 glow-sm">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="gradient-text">ChatGPT Free</span> vs adblockerGPT
            </h2>
            <p className="text-xl text-gray-400">See the difference our extension makes.</p>
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-chatgpt-gray">
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Feature</th>
                  <th className="text-center py-4 px-6 text-gray-400 font-medium">ChatGPT Free</th>
                  <th className="text-center py-4 px-6 text-chatgpt-green font-medium">With adblockerGPT</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Advertisements', free: false, blocked: true },
                  { feature: 'Sponsored Content', free: false, blocked: true },
                  { feature: 'Clean Interface', free: false, blocked: true },
                  { feature: 'Distraction-Free', free: false, blocked: true },
                  { feature: 'Full AI Features', free: true, blocked: true },
                  { feature: 'Free to Use', free: true, blocked: true },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-chatgpt-gray/50 last:border-0">
                    <td className="py-4 px-6 text-white">{row.feature}</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center">
                        {row.free ? <CheckIcon /> : <XIcon />}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center bg-chatgpt-green/5">
                      <div className="flex justify-center">
                        {row.blocked ? <CheckIcon /> : <XIcon />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400 mb-4">Save $20/month compared to ChatGPT Plus for an ad-free experience</p>
            <InstallButton />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section bg-chatgpt-dark/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-gray-400">Everything you need to know about adblockerGPT.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass rounded-xl overflow-hidden">
                <button
                  className="w-full text-left py-4 px-6 flex items-center justify-between"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-chatgpt-green transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="install" className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-chatgpt-green/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-chatgpt-green/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for <span className="gradient-text">Ad-Free ChatGPT</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of users enjoying a cleaner, faster, and more private ChatGPT experience.
          </p>

          <InstallButton size="large" />

          <p className="text-gray-500 text-sm mt-6">
            Available for Chrome, Firefox, Edge &amp; Opera. Safari coming soon.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-chatgpt-gray/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-chatgpt-green rounded-lg flex items-center justify-center">
                  <ShieldIcon />
                </div>
                <span className="text-xl font-bold text-white">adblockerGPT</span>
              </div>
              <p className="text-gray-400 text-sm">
                The free ad blocker for ChatGPT. Privacy-focused and built for users who value a clean experience.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-chatgpt-green transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-chatgpt-green transition-colors">How It Works</a></li>
                <li><a href="#faq" className="hover:text-chatgpt-green transition-colors">FAQ</a></li>
                <li><a href="/blog" className="hover:text-chatgpt-green transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/about" className="hover:text-chatgpt-green transition-colors">About Us</a></li>
                <li><a href="/privacy" className="hover:text-chatgpt-green transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-chatgpt-green transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="https://twitter.com/adblockergpt" target="_blank" rel="noopener noreferrer" className="hover:text-chatgpt-green transition-colors">Twitter</a></li>
                <li><a href="mailto:support@adblockergpt.com" className="hover:text-chatgpt-green transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-chatgpt-gray/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 adblockerGPT. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Not affiliated with OpenAI or ChatGPT.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
