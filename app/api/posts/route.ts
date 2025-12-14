import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts, createPost } from '@/lib/db'

// GET /api/posts - Get all posts (for admin)
export async function GET() {
  try {
    const posts = await getAllPosts()
    return NextResponse.json({ success: true, posts })
  } catch (error) {
    console.error('Error in GET /api/posts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { slug, title, excerpt, content, author, tags, published } = body

    if (!slug || !title || !excerpt || !content || !author) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create slug-friendly version
    const cleanSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    const postData = {
      slug: cleanSlug,
      title,
      excerpt,
      content,
      coverImage: body.coverImage || '',
      author,
      tags: tags || [],
      published: published || false,
      publishedAt: published ? new Date() : undefined,
    }

    const post = await createPost(postData)

    return NextResponse.json(
      { success: true, post },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error in POST /api/posts:', error)

    // Handle duplicate slug error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'A post with this slug already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
