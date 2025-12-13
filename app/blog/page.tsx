import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

const mockPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'getting-started-with-minimalist-design',
    title: 'Getting Started with Minimalist Design',
    excerpt: 'Discover the principles of minimalist design and how to apply them to create elegant, functional interfaces that prioritize content and user experience.',
    date: '2024-03-15',
    category: 'Design',
    readTime: '5 min read'
  },
  {
    id: 2,
    slug: 'the-power-of-typography',
    title: 'The Power of Typography',
    excerpt: 'Typography is more than just choosing fonts. Learn how thoughtful type selection and hierarchy can transform your designs and improve readability.',
    date: '2024-03-10',
    category: 'Typography',
    readTime: '7 min read'
  },
  {
    id: 3,
    slug: 'building-scalable-next-apps',
    title: 'Building Scalable Next.js Applications',
    excerpt: 'Best practices for structuring and scaling Next.js applications, from project organization to performance optimization and deployment strategies.',
    date: '2024-03-05',
    category: 'Development',
    readTime: '10 min read'
  },
  {
    id: 4,
    slug: 'responsive-design-principles',
    title: 'Responsive Design Principles',
    excerpt: 'Create beautiful experiences across all devices with these fundamental responsive design principles and modern CSS techniques.',
    date: '2024-02-28',
    category: 'Design',
    readTime: '6 min read'
  },
  {
    id: 5,
    slug: 'mastering-tailwind-css',
    title: 'Mastering Tailwind CSS',
    excerpt: 'Deep dive into Tailwind CSS utilities, customization options, and advanced techniques for building maintainable styling systems.',
    date: '2024-02-20',
    category: 'CSS',
    readTime: '8 min read'
  },
  {
    id: 6,
    slug: 'the-art-of-simplicity',
    title: 'The Art of Simplicity',
    excerpt: 'Sometimes less is more. Explore how embracing simplicity in design and code can lead to more elegant and maintainable solutions.',
    date: '2024-02-15',
    category: 'Design',
    readTime: '4 min read'
  }
];

export default function BlogPage() {
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
            {mockPosts.map((post) => (
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
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
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
