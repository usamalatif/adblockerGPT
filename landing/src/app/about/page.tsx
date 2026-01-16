import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | adblockerGPT - Ad-Free ChatGPT Experience',
  description: 'Learn about adblockerGPT, the privacy-focused Chrome extension that blocks ads on ChatGPT. Discover our mission, values, and commitment to user privacy.',
  keywords: 'adblockerGPT about, chatgpt ad blocker mission, privacy focused extension, ad free chatgpt team, block chatgpt ads',
  openGraph: {
    title: 'About adblockerGPT - Our Mission & Values',
    description: 'Discover why we built adblockerGPT and our commitment to providing an ad-free, privacy-focused ChatGPT experience.',
    type: 'website',
    url: 'https://adblockergpt.com/about',
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-chatgpt-black to-chatgpt-dark py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <a href="/" className="text-chatgpt-green hover:underline mb-8 inline-block">← Back to Home</a>

        {/* Hero Section */}
        <section className="mb-16">
          <span className="text-chatgpt-green text-sm font-medium uppercase tracking-wider">About Us</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">
            Why adblockerGPT Exists
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
            We believe everyone deserves a clean, distraction-free AI experience. adblockerGPT was created to remove
            advertisements and sponsored content from ChatGPT, allowing users to focus on what matters most:
            productive conversations with AI. Our extension operates entirely within your browser, ensuring
            complete privacy with zero data collection.
          </p>
        </section>

        {/* Two Column Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* What We Stand For */}
          <section className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">What We Stand For</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-chatgpt-green rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <strong className="text-white">Zero Tracking Policy</strong>
                  <p className="text-gray-400 mt-1">
                    We never collect, store, or transmit any user data. Your browsing activity, ChatGPT conversations,
                    and personal information remain completely private.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-chatgpt-green rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <strong className="text-white">Performance Optimized</strong>
                  <p className="text-gray-400 mt-1">
                    Our lightweight extension (under 50KB) is engineered for minimal resource consumption,
                    ensuring no impact on your browser or ChatGPT performance.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-chatgpt-green rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <strong className="text-white">Transparent Permissions</strong>
                  <p className="text-gray-400 mt-1">
                    We request only the minimum permissions necessary. Our extension only activates on ChatGPT
                    domains and cannot access any other websites or data.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-chatgpt-green rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <strong className="text-white">Forever Free</strong>
                  <p className="text-gray-400 mt-1">
                    No premium tiers, no subscriptions, no hidden costs. adblockerGPT is and will always remain
                    completely free for all users.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* Privacy & Transparency */}
          <section className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Privacy & Transparency</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-chatgpt-green rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <strong className="text-white">Local Processing Only</strong>
                  <p className="text-gray-400 mt-1">
                    All ad detection and removal happens locally in your browser. No external servers,
                    no cloud processing, no data ever leaves your device.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-chatgpt-green rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <strong className="text-white">Minimal Permissions</strong>
                  <p className="text-gray-400 mt-1">
                    We only request permissions for ChatGPT domains (chat.openai.com and chatgpt.com) and
                    local storage for your preferences. Nothing more.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-chatgpt-green rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <strong className="text-white">Easy Removal</strong>
                  <p className="text-gray-400 mt-1">
                    Uninstall anytime with a single click. We leave no traces, no residual files,
                    and no lingering processes on your system.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-chatgpt-green rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <strong className="text-white">Privacy-First Design</strong>
                  <p className="text-gray-400 mt-1">
                    Built from the ground up with privacy as the core principle. We don&apos;t use analytics,
                    tracking pixels, or any form of user monitoring.
                  </p>
                </div>
              </li>
            </ul>
          </section>
        </div>

        {/* Our Mission */}
        <section className="glass rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            In an era where digital advertising has become increasingly intrusive, we saw a need for a simple,
            effective solution that respects user privacy. ChatGPT has revolutionized how millions of people
            work, learn, and create. We believe this powerful tool should be accessible without the distraction
            of advertisements disrupting your workflow.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            adblockerGPT was built by developers who use ChatGPT daily and wanted a cleaner, more focused experience.
            Our commitment is straightforward: provide the best ad-blocking solution for ChatGPT while maintaining
            absolute respect for user privacy.
          </p>
          <p className="text-gray-400 leading-relaxed">
            We don&apos;t monetize through ads, data collection, or premium features. Our motivation is simply to
            create a better ChatGPT experience for everyone.
          </p>
        </section>

        {/* How It Works */}
        <section className="glass rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-semibold text-white mb-4">How adblockerGPT Works</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Our extension uses advanced pattern detection to identify and remove advertisement elements from
            ChatGPT pages. The technology operates through multiple detection strategies:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4 mb-4">
            <li>CSS class and attribute pattern matching</li>
            <li>Text content analysis for sponsored indicators</li>
            <li>DOM structure recognition for ad containers</li>
            <li>Real-time monitoring for dynamically loaded content</li>
          </ul>
          <p className="text-gray-400 leading-relaxed">
            All processing happens instantaneously within your browser, typically removing ads before they&apos;re
            even visible. The extension continuously monitors for new content, ensuring a consistently ad-free
            experience throughout your ChatGPT sessions.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="border border-white/10 rounded-2xl p-8 bg-white/5">
          <h2 className="text-xl font-semibold text-white mb-4">Independent Project Disclaimer</h2>
          <p className="text-gray-400 leading-relaxed">
            adblockerGPT is an independent browser extension project. We have no affiliation with, endorsement by,
            or sponsorship from OpenAI, ChatGPT, or any related entities. &quot;ChatGPT&quot; and &quot;OpenAI&quot; are trademarks
            of their respective owners. This extension is provided as-is to enhance user experience and does not
            modify or interfere with ChatGPT&apos;s core functionality.
          </p>
        </section>

        {/* CTA */}
        <section className="text-center mt-16">
          <h2 className="text-2xl font-semibold text-white mb-4">Ready for Ad-Free ChatGPT?</h2>
          <p className="text-gray-400 mb-6">Join thousands of users enjoying a cleaner ChatGPT experience.</p>
          <a
            href="/"
            className="inline-block bg-chatgpt-green hover:bg-chatgpt-green-dark text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
          >
            Get adblockerGPT Free
          </a>
        </section>
      </div>
    </main>
  )
}
