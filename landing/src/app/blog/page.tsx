import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog | adblockerGPT - ChatGPT Ad Blocking Tips & Guides',
  description: 'Learn how to block ads on ChatGPT with our expert guides, tutorials, and comparison articles. Stay updated on ChatGPT advertising and ad-blocking solutions.',
  keywords: 'chatgpt ad blocker blog, block chatgpt ads guide, chatgpt advertising news, remove ads chatgpt tutorial, ad blocking tips',
  openGraph: {
    title: 'adblockerGPT Blog - ChatGPT Ad Blocking Guides',
    description: 'Expert guides and tutorials on blocking ads in ChatGPT. Compare ad blockers and learn the best methods.',
    type: 'website',
    url: 'https://adblockergpt.com/blog',
  },
}

const blogPosts = [
  {
    slug: 'block-chatgpt-ads-2026',
    title: '5 Best Ways to Block ChatGPT Ads in 2026 | Complete Guide',
    description: 'Compare the top ChatGPT ad blockers including adblockerGPT, uBlock Origin, AdGuard, and more. Find the best free solution with our detailed setup guides.',
    date: 'January 2026',
    category: 'Ad Blocking',
    readTime: '8 min read',
    featured: true,
  },
  {
    slug: 'chatgpt-ads-explained',
    title: 'ChatGPT Ads Explained: What You Need to Know',
    description: 'Understanding how OpenAI implements advertising in ChatGPT and what it means for users. Learn about different ad formats and their impact.',
    date: 'January 2026',
    category: 'News',
    readTime: '5 min read',
    featured: false,
  },
  {
    slug: 'privacy-guide-chatgpt',
    title: 'Ultimate Privacy Guide for ChatGPT Users',
    description: 'Protect your privacy while using ChatGPT. Tips on data collection, conversation history, and using extensions safely.',
    date: 'January 2026',
    category: 'Privacy',
    readTime: '6 min read',
    featured: false,
  },
]

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured)
  const otherPosts = blogPosts.filter(post => !post.featured)

  return (
    <main className="min-h-screen bg-gradient-to-b from-chatgpt-black to-chatgpt-dark py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-chatgpt-green hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>

        {/* Header */}
        <section className="mb-16">
          <span className="text-chatgpt-green text-sm font-medium uppercase tracking-wider">Blog</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">
            ChatGPT Ad Blocking Guides & Tips
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
            Expert tutorials, comparisons, and news about blocking advertisements on ChatGPT.
            Stay informed about the latest ad-blocking techniques and privacy tools.
          </p>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <h2 className="text-sm font-medium text-chatgpt-green uppercase tracking-wider mb-6">Featured Article</h2>
            <Link href={`/blog/${featuredPost.slug}`} className="block">
              <article className="glass rounded-2xl p-8 hover:border-chatgpt-green/50 transition-all duration-300 border border-transparent">
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="bg-chatgpt-green/20 text-chatgpt-green text-xs font-medium px-3 py-1 rounded-full">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-500 text-sm">{featuredPost.date}</span>
                  <span className="text-gray-500 text-sm">• {featuredPost.readTime}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 hover:text-chatgpt-green transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {featuredPost.description}
                </p>
                <span className="inline-block mt-6 text-chatgpt-green font-medium">
                  Read Full Article →
                </span>
              </article>
            </Link>
          </section>
        )}

        {/* Other Posts */}
        <section>
          <h2 className="text-sm font-medium text-chatgpt-green uppercase tracking-wider mb-6">More Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {otherPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                <article className="glass rounded-xl p-6 hover:border-chatgpt-green/50 transition-all duration-300 border border-transparent h-full">
                  <div className="flex flex-wrap gap-3 mb-3">
                    <span className="bg-chatgpt-green/20 text-chatgpt-green text-xs font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 hover:text-chatgpt-green transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm mb-4">
                    {post.description}
                  </p>
                  <span className="text-chatgpt-green text-sm font-medium">
                    Read Article →
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-16 glass rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Get the latest tips on blocking ChatGPT ads and protecting your privacy.
            We&apos;ll notify you when new guides are published.
          </p>
          <Link
            href="/"
            className="inline-block bg-chatgpt-green hover:bg-chatgpt-green-dark text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
          >
            Get adblockerGPT Free
          </Link>
        </section>
      </div>
    </main>
  )
}
