'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          <span className="font-serif italic">minimal</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-secondary hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/blog" className="text-secondary hover:text-primary transition-colors">
            Articles
          </Link>
          <Link href="/about" className="text-secondary hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-secondary hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-primary"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 px-6 py-4 space-y-4">
          <Link href="/" className="block text-secondary hover:text-primary">Home</Link>
          <Link href="/blog" className="block text-secondary hover:text-primary">Articles</Link>
          <Link href="/about" className="block text-secondary hover:text-primary">About</Link>
          <Link href="/contact" className="block text-secondary hover:text-primary">Contact</Link>
        </div>
      )}
    </header>
  )
}
