import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BlogCard } from '@/components/BlogCard'
import { getSmakslyBlogs, formatBlogDate, estimateReadTime, SmakslyBlog } from '@/lib/smaksly-blogs'

// Transform Smaksly blog to display format
function transformBlog(blog: SmakslyBlog) {
  // Extract excerpt from body (first 150 chars, strip HTML)
  const plainText = blog.body.replace(/<[^>]*>/g, '').trim()
  const excerpt = plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText

  return {
    slug: blog.slug,
    title: blog.title,
    excerpt,
    date: formatBlogDate(blog.publish_date),
    readTime: estimateReadTime(blog.body),
    image: blog.image_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
    category: blog.category || 'General',
  }
}

// Force dynamic rendering - fetch fresh data on every request
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  // Fetch blogs from Smaksly database
  const smakslyBlogs = await getSmakslyBlogs()

  // Transform to display format
  const blogs = smakslyBlogs.map(transformBlog)
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Thoughts on <span className="italic">simplicity</span>
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            A space for contemplative writing about life, creativity, and the pursuit of meaningful work.
          </p>
        </section>

        {/* Featured Post */}
        {blogs.length > 0 && (
          <section className="max-w-4xl mx-auto px-6 mb-16">
            <div className="border-t border-b border-gray-200 py-12">
              <span className="text-sm text-accent font-medium uppercase tracking-wider">Featured</span>
              <Link href={`/blog/${blogs[0].slug}`}>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mt-4 mb-4 hover:text-accent transition-colors">
                  {blogs[0].title}
                </h2>
              </Link>
              <p className="text-lg text-secondary mb-4 leading-relaxed">
                {blogs[0].excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-secondary">
                <span>{blogs[0].date}</span>
                <span>•</span>
                <span>{blogs[0].readTime}</span>
              </div>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <h2 className="text-2xl font-bold text-primary mb-10">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.slug} {...blog} />
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-primary text-white py-20">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-8">
              Get new articles delivered to your inbox. No spam, just thoughtful content.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-grow px-4 py-3 rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
