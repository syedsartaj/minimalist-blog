import Link from 'next/link'
import Image from 'next/image'

interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  image: string
  category: string
}

export function BlogCard({ slug, title, excerpt, date, readTime, image, category }: BlogCardProps) {
  return (
    <article className="group">
      <Link href={`/blog/${slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <span className="text-sm text-accent font-medium uppercase tracking-wider">
          {category}
        </span>
        <h3 className="text-xl font-bold text-primary mt-2 mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-secondary text-sm leading-relaxed mb-3">
          {excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-secondary">
          <span>{date}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>
      </Link>
    </article>
  )
}
