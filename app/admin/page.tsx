'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, FileText, Eye, X, Save, Image } from 'lucide-react'

interface Author {
  name: string
  avatar: string
}

interface Post {
  _id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  author: Author
  category: string
  publishedAt?: Date
  published: boolean
  tags: string[]
  createdAt?: Date
  updatedAt?: Date
}

type ToastType = 'success' | 'error'

interface Toast {
  id: number
  message: string
  type: ToastType
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [saving, setSaving] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [tagInput, setTagInput] = useState('')

  const [formData, setFormData] = useState<Post>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    author: { name: '', avatar: '' },
    category: '',
    published: false,
    tags: [],
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = posts.filter(
        post =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      setFilteredPosts(filtered)
    } else {
      setFilteredPosts(posts)
    }
  }, [searchQuery, posts])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      const data = await response.json()
      if (data.success) {
        setPosts(data.posts)
        setFilteredPosts(data.posts)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      showToast('Failed to fetch posts', 'error')
    } finally {
      setLoading(false)
    }
  }

  const showToast = (message: string, type: ToastType) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 4000)
  }

  const handleCreatePost = () => {
    setEditingPost(null)
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      author: { name: '', avatar: '' },
      category: '',
      published: false,
      tags: [],
    })
    setTagInput('')
    setShowForm(true)
  }

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setFormData(post)
    setTagInput('')
    setShowForm(true)
  }

  const handleDeletePost = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        await fetchPosts()
        showToast('Post deleted successfully', 'success')
      } else {
        showToast('Failed to delete post: ' + data.error, 'error')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      showToast('Failed to delete post', 'error')
    }
  }

  const handleDeleteAllPosts = async () => {
    if (!confirm(`Are you sure you want to delete ALL ${posts.length} posts? This action cannot be undone!`)) {
      return
    }

    if (!confirm('This is your final warning. Delete ALL posts?')) {
      return
    }

    try {
      const deletePromises = posts.map(post =>
        fetch(`/api/posts/${post._id}`, { method: 'DELETE' })
      )

      await Promise.all(deletePromises)
      await fetchPosts()
      showToast('All posts deleted successfully', 'success')
    } catch (error) {
      console.error('Error deleting all posts:', error)
      showToast('Failed to delete all posts', 'error')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = editingPost ? `/api/posts/${editingPost._id}` : '/api/posts'
      const method = editingPost ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        await fetchPosts()
        setShowForm(false)
        setEditingPost(null)
        showToast(
          editingPost ? 'Post updated successfully' : 'Post created successfully',
          'success'
        )
      } else {
        showToast('Failed to save post: ' + data.error, 'error')
      }
    } catch (error) {
      console.error('Error saving post:', error)
      showToast('Failed to save post', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else if (name.startsWith('author.')) {
      const field = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        author: { ...prev.author, [field]: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] ${
              toast.type === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            <span className="flex-grow">{toast.message}</span>
            <button
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="hover:opacity-75"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blog Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Manage all your posts from one place</p>
            </div>
            <a
              href="/"
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Eye size={16} />
              View Site
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Actions Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
          <div className="flex gap-3">
            <button
              onClick={handleCreatePost}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 font-medium"
            >
              <Plus size={20} />
              Create Post
            </button>
            <button
              onClick={handleEditPost.bind(null, posts[0])}
              disabled={posts.length === 0}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Edit size={20} />
              Edit Blog
            </button>
            <button
              onClick={handleDeleteAllPosts}
              disabled={posts.length === 0}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={20} />
              Delete Blog
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{posts.length}</div>
                <div className="text-sm text-gray-600 mt-1">Total Posts</div>
              </div>
              <FileText className="text-gray-400" size={32} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {posts.filter(p => p.published).length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Published</div>
              </div>
              <Eye className="text-green-400" size={32} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-500">
                  {posts.filter(p => !p.published).length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Drafts</div>
              </div>
              <FileText className="text-gray-400" size={32} />
            </div>
          </div>
        </div>

        {/* Create/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter post title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="post-slug-url"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Brief description of the post"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent font-mono text-sm"
                  placeholder="Write your post content here..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL
                  </label>
                  <div className="flex gap-2">
                    <Image className="text-gray-400 mt-2" size={20} />
                    <input
                      type="url"
                      name="featuredImage"
                      value={formData.featuredImage}
                      onChange={handleInputChange}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Technology, Lifestyle, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    name="author.name"
                    value={formData.author.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Avatar URL
                  </label>
                  <input
                    type="url"
                    name="author.avatar"
                    value={formData.author.avatar}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Add a tag and press Enter"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-2"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                />
                <label htmlFor="published" className="text-sm font-medium text-gray-700">
                  Publish immediately
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={18} />
                  {saving ? 'Saving...' : editingPost ? 'Update Post' : 'Create Post'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search posts by title, excerpt, category, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              All Posts {searchQuery && `(${filteredPosts.length} results)`}
            </h2>
          </div>

          {loading ? (
            <div className="px-6 py-12 text-center text-gray-500">
              Loading posts...
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <FileText className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500 mb-4">
                {searchQuery ? 'No posts found matching your search.' : 'No posts yet. Create your first post!'}
              </p>
              {!searchQuery && (
                <button
                  onClick={handleCreatePost}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
                >
                  <Plus size={18} />
                  Create Post
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="px-6 py-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {post.title}
                        </h3>
                        <span
                          className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                            post.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          By {post.author.name || 'Unknown'}
                        </span>
                        <span>•</span>
                        <span>{post.category}</span>
                        <span>•</span>
                        <span>{formatDate(post.createdAt)}</span>
                        {post.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="flex gap-1.5">
                              {post.tags.slice(0, 3).map((tag, idx) => (
                                <span key={idx} className="px-2 py-0.5 bg-gray-100 rounded">
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 3 && (
                                <span className="px-2 py-0.5 bg-gray-100 rounded">
                                  +{post.tags.length - 3}
                                </span>
                              )}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post._id!, post.title)}
                        className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
