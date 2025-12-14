import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSmakslyBlogBySlug, getSmakslyBlogs, formatBlogDate, estimateReadTime, SmakslyBlog } from '@/lib/smaksly-blogs';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  image?: string;
  author: {
    name: string;
    role: string;
  };
}

// Transform Smaksly blog to display format
function transformSmakslyBlog(blog: SmakslyBlog): BlogPost {
  const plainText = blog.body.replace(/<[^>]*>/g, '').trim();
  const excerpt = plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;

  return {
    slug: blog.slug,
    title: blog.title,
    excerpt,
    date: formatBlogDate(blog.publish_date),
    category: blog.category || 'General',
    readTime: estimateReadTime(blog.body),
    content: blog.body,
    image: blog.image_url,
    author: {
      name: 'Author',
      role: 'Writer'
    }
  };
}

// Force dynamic rendering - fetch fresh data on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateStaticParams() {
  // Get slugs from Smaksly blogs for static generation
  const smakslyBlogs = await getSmakslyBlogs();
  return smakslyBlogs.map((blog) => ({ slug: blog.slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Get from Smaksly database
  const smakslyBlog = await getSmakslyBlogBySlug(params.slug);

  if (!smakslyBlog) {
    notFound();
  }

  const post = transformSmakslyBlog(smakslyBlog);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Header />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 py-16">
          <Link
            href="/blog"
            className="inline-flex items-center text-[#0066cc] font-medium hover:underline mb-8"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-[#0066cc]">
                {post.category}
              </span>
              <span className="text-sm text-[#666666]">•</span>
              <time className="text-sm text-[#666666]">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span className="text-sm text-[#666666]">•</span>
              <span className="text-sm text-[#666666]">{post.readTime}</span>
            </div>

            <h1 className="text-5xl font-serif font-bold text-[#1a1a1a] mb-4">
              {post.title}
            </h1>

            <p className="text-xl text-[#666666] leading-relaxed mb-6">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
              <div className="w-12 h-12 rounded-full bg-[#0066cc] flex items-center justify-center text-white font-semibold">
                {post.author.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-medium text-[#1a1a1a]">{post.author.name}</div>
                <div className="text-sm text-[#666666]">{post.author.role}</div>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="text-[#1a1a1a] leading-relaxed">
              {post.content.split('\n').map((paragraph, index) => {
                const trimmed = paragraph.trim();

                if (!trimmed) return null;

                if (trimmed.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-4xl font-serif font-bold mt-12 mb-6 text-[#1a1a1a]">
                      {trimmed.substring(2)}
                    </h1>
                  );
                }

                if (trimmed.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-3xl font-serif font-bold mt-10 mb-4 text-[#1a1a1a]">
                      {trimmed.substring(3)}
                    </h2>
                  );
                }

                if (trimmed.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-2xl font-serif font-bold mt-8 mb-3 text-[#1a1a1a]">
                      {trimmed.substring(4)}
                    </h3>
                  );
                }

                if (trimmed.startsWith('```')) {
                  return null;
                }

                if (trimmed.startsWith('-')) {
                  return (
                    <li key={index} className="ml-6 mb-2 text-lg">
                      {trimmed.substring(1).trim()}
                    </li>
                  );
                }

                return (
                  <p key={index} className="mb-6 text-lg leading-relaxed">
                    {trimmed}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link
              href="/blog"
              className="inline-flex items-center text-[#0066cc] font-medium hover:underline"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
