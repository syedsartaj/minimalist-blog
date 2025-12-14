'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import PostForm from '@/components/PostForm'
import { Post } from '@/lib/db'

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPost()
  }, [params.id])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}`)
      const data = await response.json()

      if (data.success) {
        setPost(data.post)
      } else {
        setError(data.error || 'Post not found')
      }
    } catch (err) {
      setError('Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
              <p className="text-sm text-gray-600 mt-1">
                {post ? post.title : 'Loading...'}
              </p>
            </div>
            <Link
              href="/admin"
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to Admin
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              Loading post...
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-600 mb-4">{error}</div>
              <Link
                href="/admin"
                className="text-blue-600 hover:underline"
              >
                Back to Admin
              </Link>
            </div>
          ) : post ? (
            <PostForm post={post} mode="edit" />
          ) : null}
        </div>
      </main>
    </div>
  )
}
