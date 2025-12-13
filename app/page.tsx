import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BlogCard } from '@/components/BlogCard'

// Sample blog data - in production, this comes from MongoDB via API
const sampleBlogs = [
  {
    slug: 'the-art-of-simple-living',
    title: 'The Art of Simple Living',
    excerpt: 'Discover how minimalism can transform your daily life and bring clarity to your thoughts.',
    date: '2024-01-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
    category: 'Lifestyle',
  },
  {
    slug: 'finding-focus-digital-age',
    title: 'Finding Focus in a Digital Age',
    excerpt: 'Strategies for maintaining concentration and productivity when distractions are everywhere.',
    date: '2024-01-10',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800',
    category: 'Productivity',
  },
  {
    slug: 'morning-rituals-success',
    title: 'Morning Rituals for Success',
    excerpt: 'How the first hour of your day can set the tone for everything that follows.',
    date: '2024-01-05',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800',
    category: 'Wellness',
  },
]

export default function Home() {
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
        <section className="max-w-4xl mx-auto px-6 mb-16">
          <div className="border-t border-b border-gray-200 py-12">
            <span className="text-sm text-accent font-medium uppercase tracking-wider">Featured</span>
            <Link href={`/blog/${sampleBlogs[0].slug}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-4 mb-4 hover:text-accent transition-colors">
                {sampleBlogs[0].title}
              </h2>
            </Link>
            <p className="text-lg text-secondary mb-4 leading-relaxed">
              {sampleBlogs[0].excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-secondary">
              <span>{sampleBlogs[0].date}</span>
              <span>•</span>
              <span>{sampleBlogs[0].readTime}</span>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <h2 className="text-2xl font-bold text-primary mb-10">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleBlogs.map((blog) => (
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
