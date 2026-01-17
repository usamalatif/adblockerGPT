import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | adblockerGPT',
  description: 'adblockerGPT privacy policy. Learn how we protect your data and maintain your privacy.',
  alternates: {
    canonical: 'https://www.adblockergpt.com/privacy',
  },
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
            <h2 className="text-2xl font-semibold text-white mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed">
              adblockerGPT is committed to protecting your privacy. This policy explains what data we collect and how we use it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Data We Collect</h2>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">Anonymous Analytics Data</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use Google Analytics to collect anonymous usage statistics including:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
              <li>Extension install and uninstall events</li>
              <li>Daily active user counts</li>
              <li>General usage patterns (e.g., how often the extension is toggled)</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              This data is anonymized and cannot be used to identify individual users.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">Locally Stored Data</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              The following data is stored locally on your device and never transmitted:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Ad blocking preferences (enabled/disabled)</li>
              <li>Count of blocked ads</li>
              <li>Badge display settings</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Data We Do NOT Collect</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Personal information (name, email, etc.)</li>
              <li>Browsing history</li>
              <li>Website content or ChatGPT conversations</li>
              <li>IP addresses</li>
              <li>Cookies or tracking identifiers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">How the Extension Works</h2>
            <p className="text-gray-300 leading-relaxed">
              adblockerGPT operates entirely within your browser. It detects and removes ad elements on ChatGPT and other websites using pattern matching. All ad-blocking processing happens locally on your device.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Permissions Explained</h2>
            <p className="text-gray-300 leading-relaxed mb-4">Our extension requests the following permissions:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>activeTab:</strong> To detect when you're on a webpage</li>
              <li><strong>storage:</strong> To save your preferences locally</li>
              <li><strong>Host permissions (all URLs):</strong> To run ad-blocking scripts on websites you visit</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
            <p className="text-gray-300 leading-relaxed">
              We use Google Analytics for anonymous usage statistics only. No other third-party services have access to any data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Data Sharing</h2>
            <p className="text-gray-300 leading-relaxed">
              We do not sell, trade, or share any data with third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
            <p className="text-gray-300 leading-relaxed">
              You can disable analytics by uninstalling the extension. All locally stored data is automatically deleted when you uninstall.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this policy occasionally. Changes will be posted on this page with an updated "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@adblockergpt.com" className="text-chatgpt-green hover:underline">
                privacy@adblockergpt.com
              </a>
              {' '}or via{' '}
              <a href="https://x.com/OrdinaryWeb3Dev" target="_blank" rel="noopener noreferrer" className="text-chatgpt-green hover:underline">
                Twitter / X
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
