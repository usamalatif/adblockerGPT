import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | adblockerGPT',
  description: 'Get in touch with the adblockerGPT team. Contact us for support, feedback, or partnership inquiries.',
  keywords: 'contact adblockerGPT, adblockerGPT support, chatgpt ad blocker contact, adblockerGPT help',
  alternates: {
    canonical: 'https://www.adblockergpt.com/contact',
  },
}

const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const MessageIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

const BugIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-chatgpt-black to-chatgpt-dark py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <a href="/" className="text-chatgpt-green hover:underline mb-8 inline-block">← Back to Home</a>

        {/* Header */}
        <section className="mb-16">
          <span className="text-chatgpt-green text-sm font-medium uppercase tracking-wider">Contact</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
            Have questions, feedback, or just want to say hello? We&apos;d love to hear from you.
            Reach out on Twitter for the fastest response.
          </p>
        </section>

        {/* Contact Method - Twitter Only */}
        <div className="mb-16">
          <a
            href="https://x.com/OrdinaryWeb3Dev"
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-2xl p-8 hover:border-chatgpt-green/50 transition-all duration-300 border border-transparent group block max-w-md mx-auto"
          >
            <div className="w-14 h-14 bg-chatgpt-green/20 rounded-xl flex items-center justify-center text-chatgpt-green mb-4 group-hover:bg-chatgpt-green group-hover:text-white transition-all duration-300 mx-auto">
              <TwitterIcon />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 text-center">Twitter / X</h3>
            <p className="text-gray-400 mb-4 text-center">
              Follow us and send a DM for the fastest response. We&apos;re active daily.
            </p>
            <span className="text-chatgpt-green font-medium block text-center">@OrdinaryWeb3Dev →</span>
          </a>
        </div>

        {/* Specific Contact Types */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6">How Can We Help?</h2>

          <div className="space-y-4">
            <div className="glass rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 flex-shrink-0">
                  <MessageIcon />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">General Questions</h3>
                  <p className="text-gray-400 mb-2">
                    Questions about how adblockerGPT works, features, or compatibility? Check our{' '}
                    <a href="/#faq" className="text-chatgpt-green hover:underline">FAQ</a> first,
                    or reach out on Twitter for quick answers.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 flex-shrink-0">
                  <BugIcon />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Bug Reports</h3>
                  <p className="text-gray-400 mb-2">
                    Found an issue or ads that aren&apos;t being blocked? Let us know! Include details like your
                    browser version, what you&apos;re seeing, and any error messages. DM us on{' '}
                    <a href="https://x.com/OrdinaryWeb3Dev" target="_blank" rel="noopener noreferrer" className="text-chatgpt-green hover:underline">Twitter</a>.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Feature Requests</h3>
                  <p className="text-gray-400 mb-2">
                    Have an idea for improving adblockerGPT? We love hearing from users! Share your suggestions
                    on Twitter and we&apos;ll consider them for future updates.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-400 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Business & Partnerships</h3>
                  <p className="text-gray-400 mb-2">
                    Interested in collaborating or have a business proposal? Reach out via{' '}
                    <a href="https://x.com/OrdinaryWeb3Dev" target="_blank" rel="noopener noreferrer" className="text-chatgpt-green hover:underline">Twitter DM</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Response Time */}
        <section className="glass rounded-2xl p-8 text-center mb-16">
          <h2 className="text-2xl font-semibold text-white mb-4">Response Time</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            We typically respond to Twitter DMs within a few hours during business days.
            For urgent issues, Twitter is your best bet!
          </p>
        </section>

        {/* Support the Project */}
        <section className="border border-chatgpt-green/30 rounded-2xl p-8 bg-chatgpt-green/5 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Support the Project</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            adblockerGPT is free and always will be. If you find it useful, consider buying us a coffee
            to help keep the project going!
          </p>
          <a
            href="https://www.buymeacoffee.com/ordinarykai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#40DCA5] hover:bg-[#35b88a] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
            style={{ fontFamily: 'Cookie, cursive' }}
          >
            <span className="text-xl">☕</span>
            Buy me a coffee
          </a>
        </section>
      </div>
    </main>
  )
}
