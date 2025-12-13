import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-serif font-bold text-[#1a1a1a] mb-8">
            About
          </h1>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-1">
              <div className="aspect-square bg-gradient-to-br from-[#0066cc] to-[#1a1a1a] rounded-lg flex items-center justify-center">
                <div className="text-white text-6xl font-serif font-bold">M</div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-[#1a1a1a] leading-relaxed mb-6">
                  Welcome to Minimalist Blog, where simplicity meets sophistication.
                  We believe that great design doesn't shout—it whispers with confidence
                  and clarity.
                </p>

                <p className="text-lg text-[#666666] leading-relaxed mb-6">
                  Founded in 2024, this blog serves as a platform for exploring the
                  intersection of design, development, and digital craftsmanship. Our
                  mission is to share insights, techniques, and perspectives that help
                  creators build better, more thoughtful products.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-[#1a1a1a] mb-8">
              Our Philosophy
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-serif font-bold text-[#1a1a1a] mb-3">
                  Quality Over Quantity
                </h3>
                <p className="text-[#666666] leading-relaxed">
                  We believe in publishing thoughtful, well-researched content rather
                  than chasing daily deadlines. Every article is carefully crafted to
                  provide lasting value.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-serif font-bold text-[#1a1a1a] mb-3">
                  Clarity and Purpose
                </h3>
                <p className="text-[#666666] leading-relaxed">
                  Good design removes the unnecessary to highlight what matters. We
                  apply this principle to both our content and our presentation.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-serif font-bold text-[#1a1a1a] mb-3">
                  Timeless Principles
                </h3>
                <p className="text-[#666666] leading-relaxed">
                  While we explore modern tools and techniques, we focus on fundamental
                  principles that remain relevant regardless of changing trends.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-serif font-bold text-[#1a1a1a] mb-3">
                  Community Focused
                </h3>
                <p className="text-[#666666] leading-relaxed">
                  We're here to learn alongside our readers. Your questions, feedback,
                  and contributions help shape the conversations we have.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-[#1a1a1a] mb-8">
              What We Cover
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0066cc] flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">
                    Design Principles
                  </h3>
                  <p className="text-[#666666] leading-relaxed">
                    Exploring the fundamentals of visual design, typography, color theory,
                    and user experience that create compelling digital products.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0066cc] flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">
                    Modern Development
                  </h3>
                  <p className="text-[#666666] leading-relaxed">
                    Deep dives into frameworks, tools, and best practices for building
                    scalable, performant web applications with modern technologies.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0066cc] flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">
                    Workflow and Process
                  </h3>
                  <p className="text-[#666666] leading-relaxed">
                    Insights into how to work more effectively, from project organization
                    and tooling to collaboration and decision-making frameworks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 rounded-lg border border-gray-200 text-center">
            <h2 className="text-3xl font-serif font-bold text-[#1a1a1a] mb-4">
              Let's Connect
            </h2>
            <p className="text-lg text-[#666666] leading-relaxed mb-8 max-w-2xl mx-auto">
              Have questions, suggestions, or just want to say hello? We'd love to
              hear from you. Reach out through our contact page and let's start a
              conversation.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#0066cc] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#0052a3] transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
