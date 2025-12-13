import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  author: {
    name: string;
    role: string;
  };
}

const mockPosts: Record<string, BlogPost> = {
  'getting-started-with-minimalist-design': {
    slug: 'getting-started-with-minimalist-design',
    title: 'Getting Started with Minimalist Design',
    excerpt: 'Discover the principles of minimalist design and how to apply them to create elegant, functional interfaces.',
    date: '2024-03-15',
    category: 'Design',
    readTime: '5 min read',
    author: {
      name: 'Jane Doe',
      role: 'Design Lead'
    },
    content: `
# Introduction

Minimalist design is more than just a aesthetic choice—it's a philosophy that prioritizes clarity, functionality, and user experience above all else. By removing unnecessary elements and focusing on what truly matters, we create interfaces that are both beautiful and intuitive.

## The Core Principles

### 1. Less is More

The foundation of minimalist design lies in the conscious decision to include only what is essential. Every element should serve a purpose, whether functional or aesthetic. This doesn't mean your designs should be sparse or boring—rather, each component should be thoughtfully considered.

### 2. Focus on Typography

With fewer visual elements competing for attention, typography takes center stage in minimalist design. The choice of typeface, size, spacing, and hierarchy becomes crucial in creating visual interest and guiding the user's eye through the content.

### 3. White Space is Your Friend

White space (or negative space) is not wasted space—it's a powerful design tool. It provides breathing room for your content, improves readability, and creates a sense of elegance and sophistication.

## Practical Application

When implementing minimalist design in your projects, start by removing rather than adding. Begin with the bare essentials and only introduce new elements when they serve a clear purpose.

Consider these questions for each element:
- Does this serve the user's needs?
- Does it contribute to the overall message?
- Could the design work without it?

## Conclusion

Minimalist design is about making intentional choices. It requires discipline and a deep understanding of your users' needs. But when done well, it results in experiences that are timeless, accessible, and genuinely user-centered.
    `
  },
  'the-power-of-typography': {
    slug: 'the-power-of-typography',
    title: 'The Power of Typography',
    excerpt: 'Typography is more than just choosing fonts. Learn how thoughtful type selection and hierarchy can transform your designs.',
    date: '2024-03-10',
    category: 'Typography',
    readTime: '7 min read',
    author: {
      name: 'John Smith',
      role: 'Creative Director'
    },
    content: `
# The Foundation of Visual Communication

Typography is the art and technique of arranging type to make written language legible, readable, and appealing. It's one of the most powerful tools in a designer's toolkit, capable of conveying emotion, establishing hierarchy, and creating visual harmony.

## Understanding Type Anatomy

Before diving into typography, it's essential to understand the basic anatomy of typefaces. Terms like baseline, x-height, ascenders, and descenders aren't just jargon—they're fundamental concepts that affect how text is perceived and how well it performs in different contexts.

## Choosing the Right Typeface

The typeface you choose sets the tone for your entire design. Serif fonts often convey tradition and authority, while sans-serif fonts feel modern and clean. Script fonts can add personality but should be used sparingly.

### Consider These Factors:
- **Readability**: Can users easily read the text at various sizes?
- **Context**: Does the typeface fit your brand and message?
- **Versatility**: Does the font family include the weights and styles you need?
- **Performance**: Does the font load quickly and render well across devices?

## Creating Hierarchy

Type hierarchy guides readers through your content, signaling what's important and how information is organized. Use size, weight, color, and spacing to create clear distinctions between headings, subheadings, and body text.

## The Magic of Pairing

Combining typefaces is an art. A classic approach is to pair a serif with a sans-serif, but the key is to create contrast while maintaining harmony. Look for fonts that share similar proportions or have complementary personalities.

## Conclusion

Mastering typography takes time and practice, but the investment pays dividends. Great typography is invisible—it doesn't call attention to itself, but rather enhances the reading experience and strengthens your message.
    `
  },
  'building-scalable-next-apps': {
    slug: 'building-scalable-next-apps',
    title: 'Building Scalable Next.js Applications',
    excerpt: 'Best practices for structuring and scaling Next.js applications from project organization to deployment.',
    date: '2024-03-05',
    category: 'Development',
    readTime: '10 min read',
    author: {
      name: 'Alex Chen',
      role: 'Senior Developer'
    },
    content: `
# Building for Scale

Next.js provides an excellent foundation for building modern web applications, but as your project grows, you need to think carefully about architecture, organization, and performance. Here's what I've learned from building and scaling Next.js applications.

## Project Structure

A well-organized project structure is crucial for maintainability. The App Router in Next.js 14 encourages a feature-based organization that scales beautifully.

\`\`\`
app/
  ├── (marketing)/
  ├── (dashboard)/
  └── api/
components/
  ├── ui/
  └── features/
lib/
  ├── utils/
  └── api/
\`\`\`

## Performance Optimization

### Server Components by Default

Next.js 14's App Router makes Server Components the default. This means better performance out of the box, as less JavaScript is sent to the client. Only add "use client" when you need interactivity.

### Image Optimization

Always use Next.js's Image component. It handles responsive images, lazy loading, and modern formats automatically.

### Code Splitting

Next.js automatically code-splits by route, but you can take it further with dynamic imports for large components that aren't immediately needed.

## Data Fetching

The App Router introduces new patterns for data fetching. Server Components can fetch data directly, eliminating the need for API routes in many cases.

## State Management

Choose your state management solution based on your needs:
- Server state: React Query or SWR
- Client state: Context API for simple cases, Zustand for more complex scenarios
- URL state: Next.js's built-in searchParams

## Testing Strategy

A comprehensive testing strategy includes:
- Unit tests for utilities and pure functions
- Integration tests for complex components
- E2E tests for critical user flows

## Deployment and Monitoring

Deploy to Vercel for the best Next.js experience, or use Docker for self-hosting. Implement monitoring and error tracking from day one—you can't fix what you can't see.

## Conclusion

Building scalable applications is about making deliberate choices from the start. Invest time in your architecture, prioritize performance, and always think about maintainability. Your future self (and your team) will thank you.
    `
  },
  'responsive-design-principles': {
    slug: 'responsive-design-principles',
    title: 'Responsive Design Principles',
    excerpt: 'Create beautiful experiences across all devices with these fundamental responsive design principles.',
    date: '2024-02-28',
    category: 'Design',
    readTime: '6 min read',
    author: {
      name: 'Sarah Williams',
      role: 'UI/UX Designer'
    },
    content: `
# Designing for Every Screen

In today's multi-device world, responsive design isn't optional—it's essential. But responsive design is more than just making things fit on different screen sizes. It's about creating experiences that feel native to each device.

## Mobile-First Approach

Start designing for mobile devices first, then progressively enhance for larger screens. This approach forces you to prioritize content and functionality, resulting in cleaner, more focused designs.

## Flexible Grids

Use relative units like percentages or fr units in CSS Grid instead of fixed pixel values. This allows your layout to adapt fluidly to different screen sizes.

## Breakpoints Based on Content

Don't just use standard breakpoints (320px, 768px, 1024px). Add breakpoints where your content needs them. If your design breaks at 850px, add a breakpoint there.

## Touch Targets

On mobile devices, ensure interactive elements are at least 44x44 pixels. Fingers are less precise than mouse cursors, and users shouldn't have to zoom in to tap a button.

## Images and Media

Use responsive images with srcset and sizes attributes. Consider using different crops or even different images for different screen sizes—what works in a wide desktop view might not work in a narrow mobile view.

## Typography

Scale your typography based on viewport width using clamp() or a combination of fixed and viewport units. Ensure text remains readable across all devices without requiring zoom.

## Testing

Test on real devices whenever possible. Simulators are helpful, but nothing beats holding a real phone or tablet and experiencing your design as users will.

## Conclusion

Responsive design is an ongoing process. As new devices and screen sizes emerge, we must continue to adapt our approaches. The goal is always the same: create experiences that work beautifully, no matter how they're accessed.
    `
  },
  'mastering-tailwind-css': {
    slug: 'mastering-tailwind-css',
    title: 'Mastering Tailwind CSS',
    excerpt: 'Deep dive into Tailwind CSS utilities, customization options, and advanced techniques.',
    date: '2024-02-20',
    category: 'CSS',
    readTime: '8 min read',
    author: {
      name: 'Mike Johnson',
      role: 'Frontend Architect'
    },
    content: `
# The Utility-First Revolution

Tailwind CSS has transformed how we think about styling web applications. By providing low-level utility classes, it enables rapid development while maintaining consistency and customizability.

## Why Utility-First?

Traditional CSS methodologies like BEM or SMACSS focus on creating reusable components through class naming conventions. Tailwind flips this on its head—instead of writing custom CSS, you compose utilities directly in your markup.

### Benefits:
- **No context switching**: Style right where you build
- **Automatic constraints**: Design system built in
- **No naming fatigue**: No more struggling with class names
- **Easier refactoring**: Delete HTML, delete styles

## Customization

Tailwind's true power lies in its customization. The tailwind.config.js file is where you define your design system.

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#666666',
        accent: '#0066cc',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
    },
  },
}
\`\`\`

## Advanced Techniques

### Extracting Components

When you find yourself repeating the same utility combinations, extract them into components using your framework of choice or Tailwind's @apply directive.

### Responsive Design

Tailwind makes responsive design intuitive with its mobile-first breakpoint system. Use prefixes like md:, lg:, and xl: to apply utilities at specific breakpoints.

### Dark Mode

Tailwind includes dark mode support out of the box. Use the dark: prefix to style elements differently in dark mode.

### Custom Utilities

Create your own utilities using Tailwind's plugin system for project-specific needs that aren't covered by default utilities.

## Performance

Tailwind uses PurgeCSS to remove unused styles in production, resulting in tiny CSS files despite the framework's large surface area.

## Conclusion

Tailwind CSS might feel strange at first if you're coming from traditional CSS methodologies, but give it time. Once you experience the speed and consistency it provides, it's hard to go back.
    `
  },
  'the-art-of-simplicity': {
    slug: 'the-art-of-simplicity',
    title: 'The Art of Simplicity',
    excerpt: 'Sometimes less is more. Explore how embracing simplicity in design and code can lead to more elegant solutions.',
    date: '2024-02-15',
    category: 'Design',
    readTime: '4 min read',
    author: {
      name: 'Emily Davis',
      role: 'Product Designer'
    },
    content: `
# In Praise of Simplicity

In a world that constantly pushes for more features, more options, and more complexity, there's profound power in simplicity. Simple doesn't mean simplistic—it means distilled to its essence.

## The Complexity Trap

We often equate complexity with sophistication. More features must be better, right? But each additional feature adds cognitive load, maintenance burden, and potential failure points.

### The Cost of Complexity:
- Harder to learn and use
- More difficult to maintain
- Slower performance
- More bugs and edge cases

## Simplicity in Design

Simple designs are immediately understandable. Users don't need to read documentation or hunt through menus. The path forward is clear because there are fewer distractions and decisions to make.

## Simplicity in Code

Simple code is easier to read, test, and modify. It's not about writing fewer lines—it's about expressing intent clearly and avoiding unnecessary abstraction.

\`\`\`javascript
// Simple and clear
function getUserName(user) {
  return user.name || 'Guest';
}
\`\`\`

## Finding Simplicity

Achieving simplicity requires work. It's easier to add than to remove, easier to accommodate every edge case than to decide what doesn't belong.

Ask yourself:
- What's the core problem we're solving?
- What can we remove without losing value?
- Is this complexity serving users or just us?

## The Power of Constraints

Constraints force creativity. When you can't add another button, you find better ways to organize information. When you can't add another dependency, you write better code.

## Conclusion

Simplicity is a goal worth pursuing in both design and code. It requires discipline, careful thought, and often more work upfront. But the result is something timeless, accessible, and genuinely valuable to users.
    `
  }
};

export async function generateStaticParams() {
  return Object.keys(mockPosts).map((slug) => ({
    slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = mockPosts[params.slug];

  if (!post) {
    notFound();
  }

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
