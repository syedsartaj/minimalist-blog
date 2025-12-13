import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-primary">
              <span className="font-serif italic">minimal</span>
            </Link>
            <p className="text-secondary mt-4 max-w-md">
              A space for thoughtful writing about life, creativity, and the pursuit of meaningful work.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-primary mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-secondary hover:text-primary">Home</Link></li>
              <li><Link href="/blog" className="text-secondary hover:text-primary">Articles</Link></li>
              <li><Link href="/about" className="text-secondary hover:text-primary">About</Link></li>
              <li><Link href="/contact" className="text-secondary hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-primary mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary hover:text-primary">Twitter</a></li>
              <li><a href="#" className="text-secondary hover:text-primary">Instagram</a></li>
              <li><a href="#" className="text-secondary hover:text-primary">LinkedIn</a></li>
              <li><a href="#" className="text-secondary hover:text-primary">RSS Feed</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-secondary text-sm">
          <p>&copy; {new Date().getFullYear()} Minimal Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
