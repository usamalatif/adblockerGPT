import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ultimate Privacy Guide for ChatGPT Users in 2026',
  description: 'Protect your privacy while using ChatGPT. Complete guide to data collection, conversation history, privacy settings, and using extensions safely.',
  keywords: 'chatgpt privacy, protect privacy chatgpt, chatgpt data collection, chatgpt conversation history, chatgpt security, openai privacy',
  authors: [{ name: 'adblockerGPT Team' }],
  openGraph: {
    title: 'Ultimate Privacy Guide for ChatGPT Users in 2026',
    description: 'Learn how to protect your privacy while using ChatGPT with our comprehensive guide.',
    type: 'article',
    url: 'https://www.adblockergpt.com/blog/privacy-guide-chatgpt',
    publishedTime: '2026-01-12T00:00:00.000Z',
  },
  alternates: {
    canonical: 'https://www.adblockergpt.com/blog/privacy-guide-chatgpt',
  },
}

const CheckIcon = () => (
  <svg className="w-5 h-5 text-chatgpt-green flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const WarningIcon = () => (
  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
)

export default function PrivacyGuideChatGPT() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-chatgpt-black to-chatgpt-dark py-20 px-4">
      <article className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-chatgpt-green">Home</Link>
          <span className="text-gray-600 mx-2">/</span>
          <Link href="/blog" className="text-gray-500 hover:text-chatgpt-green">Blog</Link>
          <span className="text-gray-600 mx-2">/</span>
          <span className="text-gray-400">Privacy Guide</span>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-chatgpt-green/20 text-chatgpt-green text-xs font-medium px-3 py-1 rounded-full">
              Privacy
            </span>
            <span className="text-gray-500 text-sm">January 2026</span>
            <span className="text-gray-500 text-sm">• 6 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ultimate Privacy Guide for ChatGPT Users
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Everything you need to know about protecting your privacy while using ChatGPT.
            From data collection policies to practical tips for keeping your information safe.
          </p>
        </header>

        {/* Table of Contents */}
        <nav className="glass rounded-xl p-6 mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">In This Guide</h2>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#what-openai-collects" className="hover:text-chatgpt-green transition-colors">What Data Does OpenAI Collect?</a></li>
            <li><a href="#conversation-history" className="hover:text-chatgpt-green transition-colors">Managing Your Conversation History</a></li>
            <li><a href="#privacy-settings" className="hover:text-chatgpt-green transition-colors">Essential Privacy Settings</a></li>
            <li><a href="#safe-usage" className="hover:text-chatgpt-green transition-colors">Safe Usage Practices</a></li>
            <li><a href="#extensions" className="hover:text-chatgpt-green transition-colors">Using Extensions Safely</a></li>
            <li><a href="#checklist" className="hover:text-chatgpt-green transition-colors">Privacy Checklist</a></li>
          </ul>
        </nav>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none">
          <section id="what-openai-collects" className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">What Data Does OpenAI Collect?</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Understanding what information OpenAI collects is the first step to protecting your privacy.
              Here&apos;s a breakdown of the data categories:
            </p>

            <div className="space-y-4 mb-6">
              <div className="glass rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">Account Information</h4>
                <p className="text-gray-400 text-sm">
                  Email address, name, payment information (for Plus subscribers), and account preferences.
                </p>
              </div>

              <div className="glass rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">Conversation Data</h4>
                <p className="text-gray-400 text-sm">
                  Your prompts and ChatGPT&apos;s responses may be stored and used to improve models,
                  unless you opt out of data training.
                </p>
              </div>

              <div className="glass rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">Usage Information</h4>
                <p className="text-gray-400 text-sm">
                  How you interact with ChatGPT, features you use, session duration, and device information.
                </p>
              </div>

              <div className="glass rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">Technical Data</h4>
                <p className="text-gray-400 text-sm">
                  IP address, browser type, device identifiers, and approximate location.
                </p>
              </div>
            </div>
          </section>

          <section id="conversation-history" className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Managing Your Conversation History</h2>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-6">
              <h4 className="text-blue-200 font-semibold mb-2">How to Delete Your Chat History</h4>
              <ol className="text-gray-400 text-sm space-y-2 list-decimal list-inside">
                <li>Click on your profile icon in the bottom-left corner</li>
                <li>Select &quot;Settings&quot;</li>
                <li>Navigate to &quot;Data controls&quot;</li>
                <li>Click &quot;Clear all chats&quot; to delete everything</li>
                <li>Or delete individual conversations from the sidebar</li>
              </ol>
            </div>

            <p className="text-gray-400 leading-relaxed mb-4">
              <strong className="text-white">Important:</strong> Deleting your chat history removes it from your
              account view, but OpenAI may retain data for up to 30 days for safety monitoring. After that,
              it&apos;s permanently deleted unless required for legal reasons.
            </p>
          </section>

          <section id="privacy-settings" className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Essential Privacy Settings</h2>

            <div className="space-y-6">
              <div className="glass rounded-xl p-6 border-l-4 border-chatgpt-green">
                <h4 className="text-lg font-semibold text-white mb-2">1. Disable Chat History & Training</h4>
                <p className="text-gray-400 text-sm mb-3">
                  Prevents your conversations from being used to train future AI models.
                </p>
                <p className="text-gray-500 text-xs">
                  Settings → Data controls → Chat history & training → Toggle OFF
                </p>
              </div>

              <div className="glass rounded-xl p-6 border-l-4 border-chatgpt-green">
                <h4 className="text-lg font-semibold text-white mb-2">2. Use Temporary Chats</h4>
                <p className="text-gray-400 text-sm mb-3">
                  Temporary chats aren&apos;t saved to your history and won&apos;t be used for training.
                </p>
                <p className="text-gray-500 text-xs">
                  Look for &quot;Temporary chat&quot; option when starting a new conversation
                </p>
              </div>

              <div className="glass rounded-xl p-6 border-l-4 border-chatgpt-green">
                <h4 className="text-lg font-semibold text-white mb-2">3. Export Your Data</h4>
                <p className="text-gray-400 text-sm mb-3">
                  Request a copy of all data OpenAI has about you.
                </p>
                <p className="text-gray-500 text-xs">
                  Settings → Data controls → Export data
                </p>
              </div>

              <div className="glass rounded-xl p-6 border-l-4 border-chatgpt-green">
                <h4 className="text-lg font-semibold text-white mb-2">4. Delete Your Account</h4>
                <p className="text-gray-400 text-sm mb-3">
                  Permanently delete your account and all associated data.
                </p>
                <p className="text-gray-500 text-xs">
                  Settings → Data controls → Delete account
                </p>
              </div>
            </div>
          </section>

          <section id="safe-usage" className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Safe Usage Practices</h2>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <WarningIcon />
                <div>
                  <h4 className="text-yellow-200 font-semibold mb-2">Never Share Sensitive Information</h4>
                  <p className="text-gray-400 text-sm">
                    Avoid sharing passwords, API keys, credit card numbers, social security numbers,
                    or other sensitive personal information in your conversations.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">Do&apos;s and Don&apos;ts</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="glass rounded-xl p-6">
                <h4 className="font-semibold text-chatgpt-green mb-4">✓ Do</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-start gap-2"><CheckIcon /> Use generic examples instead of real data</li>
                  <li className="flex items-start gap-2"><CheckIcon /> Anonymize any personal information</li>
                  <li className="flex items-start gap-2"><CheckIcon /> Regularly clear your chat history</li>
                  <li className="flex items-start gap-2"><CheckIcon /> Review your privacy settings monthly</li>
                  <li className="flex items-start gap-2"><CheckIcon /> Use temporary chats for sensitive topics</li>
                </ul>
              </div>

              <div className="glass rounded-xl p-6">
                <h4 className="font-semibold text-red-400 mb-4">✗ Don&apos;t</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-start gap-2"><WarningIcon /> Share passwords or API keys</li>
                  <li className="flex items-start gap-2"><WarningIcon /> Include real names in sensitive contexts</li>
                  <li className="flex items-start gap-2"><WarningIcon /> Share confidential business data</li>
                  <li className="flex items-start gap-2"><WarningIcon /> Upload documents with personal info</li>
                  <li className="flex items-start gap-2"><WarningIcon /> Assume conversations are private</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="extensions" className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Using Browser Extensions Safely</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Browser extensions can enhance your ChatGPT experience, but they also have access to
              the pages you visit. Here&apos;s how to use them safely:
            </p>

            <div className="glass rounded-xl p-6 mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">Evaluating Extension Safety</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2"><CheckIcon /> Check the permissions requested - fewer is better</li>
                <li className="flex items-start gap-2"><CheckIcon /> Read reviews and check the developer reputation</li>
                <li className="flex items-start gap-2"><CheckIcon /> Prefer extensions with clear privacy policies</li>
                <li className="flex items-start gap-2"><CheckIcon /> Avoid extensions that request broad data access</li>
                <li className="flex items-start gap-2"><CheckIcon /> Look for extensions with minimal footprint</li>
              </ul>
            </div>

            <div className="bg-chatgpt-green/10 border border-chatgpt-green/30 rounded-xl p-6">
              <h4 className="text-chatgpt-green font-semibold mb-2">Why adblockerGPT is Privacy-Safe</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2"><CheckIcon /> Zero data collection - we don&apos;t track anything</li>
                <li className="flex items-start gap-2"><CheckIcon /> Minimal permissions - only ChatGPT domains</li>
                <li className="flex items-start gap-2"><CheckIcon /> Local processing - nothing leaves your browser</li>
                <li className="flex items-start gap-2"><CheckIcon /> Ultra-lightweight - under 50KB</li>
                <li className="flex items-start gap-2"><CheckIcon /> No external servers or API calls</li>
              </ul>
            </div>
          </section>

          <section id="checklist" className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Privacy Checklist</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Use this checklist to ensure you&apos;ve taken the essential steps to protect your privacy:
            </p>

            <div className="glass rounded-xl p-6">
              <ul className="space-y-3">
                {[
                  'Disabled chat history & training in settings',
                  'Reviewed and deleted old conversations',
                  'Enabled temporary chats for sensitive topics',
                  'Checked privacy policy for updates',
                  'Installed a trusted ad blocker (adblockerGPT)',
                  'Reviewed browser extension permissions',
                  'Set a reminder to clear history monthly',
                  'Understand what data OpenAI collects',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-400">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-600 bg-transparent text-chatgpt-green focus:ring-chatgpt-green"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <section className="glass rounded-2xl p-8 text-center mt-12">
          <h2 className="text-2xl font-bold text-white mb-4">Protect Your ChatGPT Privacy</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Start with a privacy-focused ad blocker. adblockerGPT removes ads without collecting
            any of your data. 100% free, forever.
          </p>
          <Link
            href="/"
            className="inline-block bg-chatgpt-green hover:bg-chatgpt-green-dark text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
          >
            Get adblockerGPT Free
          </Link>
        </section>

        {/* Author Info */}
        <footer className="border-t border-chatgpt-gray/50 pt-8 mt-12">
          <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-gray-500">
            <div>
              <span>Written by </span>
              <span className="text-gray-400">adblockerGPT Team</span>
            </div>
            <div>
              <span>Last updated: </span>
              <span className="text-gray-400">January 12, 2026</span>
            </div>
          </div>
        </footer>
      </article>
    </main>
  )
}
