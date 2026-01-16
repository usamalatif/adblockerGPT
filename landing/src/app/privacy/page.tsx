import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | adblockerGPT',
  description: 'adblockerGPT privacy policy. Learn how we protect your data and maintain your privacy.',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-chatgpt-black py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="text-chatgpt-green hover:underline mb-8 inline-block">← Back to Home</a>

        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400 mb-6">Last updated: January 17, 2026</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Commitment to Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              adblockerGPT is committed to protecting your privacy. This Privacy Policy explains our practices regarding data collection – or rather, our commitment to NOT collecting your data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Data Collection: None</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              <strong className="text-chatgpt-green">We do not collect any data.</strong> This includes:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>No personal information</li>
              <li>No browsing history</li>
              <li>No ChatGPT conversations</li>
              <li>No usage statistics</li>
              <li>No cookies or tracking</li>
              <li>No IP addresses</li>
              <li>No analytics data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">How the Extension Works</h2>
            <p className="text-gray-300 leading-relaxed">
              adblockerGPT operates entirely within your browser. It detects and removes ad elements on ChatGPT pages using pattern matching. All processing happens locally on your device. No data ever leaves your browser.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Permissions Explained</h2>
            <p className="text-gray-300 leading-relaxed mb-4">Our extension requests minimal permissions:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>activeTab:</strong> To detect when you're on ChatGPT</li>
              <li><strong>storage:</strong> To save your preferences locally</li>
              <li><strong>Host permissions (chat.openai.com, chatgpt.com):</strong> To run ad-blocking scripts only on ChatGPT</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
            <p className="text-gray-300 leading-relaxed">
              We do not use any third-party analytics, advertising, or tracking services. We do not share any data with third parties because we don't collect any data to share.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Commitment to Transparency</h2>
            <p className="text-gray-300 leading-relaxed">
              We are committed to transparency about how our extension works. Our ad-blocking operates entirely client-side within your browser, with no external servers or data transmission involved.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              If we ever change this policy, we will update the "Last updated" date and notify users through the extension update notes. Our commitment to zero data collection will remain unchanged.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@adblockergpt.com" className="text-chatgpt-green hover:underline">
                privacy@adblockergpt.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
