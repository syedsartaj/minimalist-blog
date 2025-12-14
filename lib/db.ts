import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || process.env.MongoDB_URL

if (!MONGODB_URI) {
  console.warn('MongoDB URI not defined - using demo mode')
}

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (!MONGODB_URI) {
    return null
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

// Post Interface
export interface Post {
  _id?: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage?: string
  author: string
  publishedAt?: Date
  tags: string[]
  published: boolean
  createdAt?: Date
  updatedAt?: Date
}

// Post Schema
const postSchema = new mongoose.Schema<Post>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Create or retrieve the Post model
const PostModel = mongoose.models.Post || mongoose.model<Post>('Post', postSchema)

// CRUD Functions

// Get all published posts (for public view)
export async function getPosts(limit?: number) {
  try {
    await connectDB()

    const query = PostModel.find({ published: true })
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean<(Post & { _id: mongoose.Types.ObjectId })[]>()

    if (limit) {
      query.limit(limit)
    }

    const posts = await query.exec()
    return posts.map(post => ({
      ...post,
      _id: post._id.toString(),
    }))
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

// Get all posts (for admin - includes drafts)
export async function getAllPosts() {
  try {
    await connectDB()

    const posts = await PostModel.find({})
      .sort({ createdAt: -1 })
      .lean<(Post & { _id: mongoose.Types.ObjectId })[]>()

    return posts.map(post => ({
      ...post,
      _id: post._id.toString(),
    }))
  } catch (error) {
    console.error('Error fetching all posts:', error)
    return []
  }
}

// Get single post by ID
export async function getPostById(id: string) {
  try {
    await connectDB()

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null
    }

    const post = await PostModel.findById(id).lean<Post & { _id: mongoose.Types.ObjectId }>()

    if (!post) {
      return null
    }

    return {
      ...post,
      _id: post._id.toString(),
    }
  } catch (error) {
    console.error('Error fetching post by ID:', error)
    return null
  }
}

// Get single post by slug
export async function getPostBySlug(slug: string) {
  try {
    await connectDB()

    const post = await PostModel.findOne({ slug, published: true }).lean<Post & { _id: mongoose.Types.ObjectId }>()

    if (!post) {
      return null
    }

    return {
      ...post,
      _id: post._id.toString(),
    }
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

// Create a new post
export async function createPost(postData: Omit<Post, '_id' | 'createdAt' | 'updatedAt'>) {
  try {
    await connectDB()

    // If published, set publishedAt date
    if (postData.published && !postData.publishedAt) {
      postData.publishedAt = new Date()
    }

    const post = new PostModel(postData)
    const savedPost = await post.save()

    return {
      ...savedPost.toObject(),
      _id: savedPost._id.toString(),
    }
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

// Update a post
export async function updatePost(id: string, postData: Partial<Post>) {
  try {
    await connectDB()

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid post ID')
    }

    // If changing to published and no publishedAt date, set it
    if (postData.published && !postData.publishedAt) {
      const existingPost = await PostModel.findById(id)
      if (existingPost && !existingPost.published) {
        postData.publishedAt = new Date()
      }
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { $set: postData },
      { new: true, runValidators: true }
    ).lean<Post & { _id: mongoose.Types.ObjectId }>()

    if (!updatedPost) {
      throw new Error('Post not found')
    }

    return {
      ...updatedPost,
      _id: updatedPost._id.toString(),
    }
  } catch (error) {
    console.error('Error updating post:', error)
    throw error
  }
}

// Delete a post
export async function deletePost(id: string) {
  try {
    await connectDB()

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid post ID')
    }

    const deletedPost = await PostModel.findByIdAndDelete(id).lean<Post & { _id: mongoose.Types.ObjectId }>()

    if (!deletedPost) {
      throw new Error('Post not found')
    }

    return {
      ...deletedPost,
      _id: deletedPost._id.toString(),
    }
  } catch (error) {
    console.error('Error deleting post:', error)
    throw error
  }
}
