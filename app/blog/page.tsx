import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { getSmakslyBlogs, formatBlogDate, estimateReadTime, SmakslyBlog } from '@/lib/smaksly-blogs';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

// Transform Smaksly blog to display format
function transformBlog(blog: SmakslyBlog): BlogPost {
  const plainText = blog.body.replace(/<[^>]*>/g, '').trim();
  const excerpt = plainText.length > 200 ? plainText.substring(0, 200) + '...' : plainText;

  return {
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    excerpt,
    date: formatBlogDate(blog.publish_date),
    category: blog.category || 'General',
    readTime: estimateReadTime(blog.body),
  };
}

// Force dynamic rendering - fetch fresh data on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPage() {
  // Fetch blogs from Smaksly database
  const smakslyBlogs = await getSmakslyBlogs();

  // Transform to display format
  const posts = smakslyBlogs.map(transformBlog);
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-12">
            <h1 className="text-5xl font-serif font-bold text-[#1a1a1a] mb-4">Blog</h1>
            <p className="text-xl text-[#666666]">
              Thoughts on design, development, and everything in between.
            </p>
          </div>

          <div className="space-y-12">
            {posts.map((post) => (
              <article
                key={post.id}
                className="border-b border-gray-200 pb-12 last:border-b-0"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-medium text-[#0066cc]">
                    {post.category}
                  </span>
                  <span className="text-sm text-[#666666]">•</span>
                  <time className="text-sm text-[#666666]">
                    {post.date}
                  </time>
                  <span className="text-sm text-[#666666]">•</span>
                  <span className="text-sm text-[#666666]">{post.readTime}</span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-3xl font-serif font-bold text-[#1a1a1a] mb-3 hover:text-[#0066cc] transition-colors">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-lg text-[#666666] mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-[#0066cc] font-medium hover:underline"
                >
                  Read more
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
