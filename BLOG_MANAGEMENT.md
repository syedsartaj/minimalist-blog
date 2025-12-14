# Blog Management System Documentation

A complete blog management system for the Minimalist Blog template, built with Next.js, TypeScript, MongoDB, and Tailwind CSS.

## Overview

This blog management system provides a full-featured admin interface for creating, editing, and managing blog posts. It includes a clean, minimal design with a focus on usability and simplicity.

## Features

- **Complete CRUD Operations**: Create, read, update, and delete blog posts
- **Admin Dashboard**: Clean interface with post listing, search, and statistics
- **Post Management**: Full-featured post editor with markdown support
- **Draft System**: Save posts as drafts before publishing
- **Search Functionality**: Search posts by title, excerpt, or tags
- **MongoDB Integration**: Robust database layer with proper connection handling
- **RESTful API**: Clean API routes for all blog operations
- **Responsive Design**: Works seamlessly on all devices

## System Architecture

### Database Layer (`lib/db.ts`)

The database layer provides:

- **MongoDB Connection**: Singleton pattern with connection caching
- **Post Schema**: Mongoose schema with validation
- **CRUD Functions**:
  - `getPosts(limit?)` - Get published posts
  - `getAllPosts()` - Get all posts (including drafts)
  - `getPostById(id)` - Get single post by ID
  - `getPostBySlug(slug)` - Get published post by slug
  - `createPost(data)` - Create new post
  - `updatePost(id, data)` - Update existing post
  - `deletePost(id)` - Delete post

### Post Interface

```typescript
interface Post {
  _id?: string
  slug: string          // URL-friendly identifier
  title: string         // Post title
  excerpt: string       // Short description
  content: string       // Full post content (supports markdown)
  coverImage?: string   // Optional cover image URL
  author: string        // Author name
  publishedAt?: Date    // Publication date (auto-set when published)
  tags: string[]        // Array of tags
  published: boolean    // Draft or published status
  createdAt?: Date      // Auto-generated
  updatedAt?: Date      // Auto-generated
}
```

### API Routes

#### `POST /api/posts`
Create a new blog post.

**Request Body:**
```json
{
  "slug": "my-post-slug",
  "title": "My Post Title",
  "excerpt": "A brief description",
  "content": "Full post content...",
  "coverImage": "https://example.com/image.jpg",
  "author": "Author Name",
  "tags": ["technology", "design"],
  "published": false
}
```

**Response:**
```json
{
  "success": true,
  "post": { /* post object */ }
}
```

#### `GET /api/posts`
Get all posts (for admin - includes drafts).

**Response:**
```json
{
  "success": true,
  "posts": [ /* array of posts */ ]
}
```

#### `GET /api/posts/[id]`
Get a single post by ID.

**Response:**
```json
{
  "success": true,
  "post": { /* post object */ }
}
```

#### `PUT /api/posts/[id]`
Update an existing post.

**Request Body:** Same as POST (partial updates supported)

**Response:**
```json
{
  "success": true,
  "post": { /* updated post object */ }
}
```

#### `DELETE /api/posts/[id]`
Delete a post.

**Response:**
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

## Admin Interface

### Dashboard (`/admin`)

The main admin dashboard provides:

- **Statistics**: Total posts, published posts, and drafts count
- **Post Listing**: Table view of all posts with key information
- **Search Bar**: Real-time search across titles, excerpts, and tags
- **Quick Actions**: Edit and delete buttons for each post
- **Status Indicators**: Visual badges for published/draft status
- **Responsive Layout**: Clean design that works on all screen sizes

### Create New Post (`/admin/posts/new`)

Features:
- **Auto-slug Generation**: Automatically creates URL-friendly slugs from titles
- **Rich Form Fields**: All post fields with proper validation
- **Tag Support**: Comma-separated tag input
- **Draft/Publish Toggle**: Save as draft or publish immediately
- **Cover Image**: Optional image URL input
- **Markdown Content**: Large textarea for markdown content

### Edit Post (`/admin/posts/[id]`)

Features:
- **Pre-filled Form**: Loads existing post data
- **Same Interface**: Consistent with create page
- **Update in Place**: Maintains post ID and creation date
- **Status Toggle**: Can publish drafts or unpublish posts

## Components

### PostForm (`components/PostForm.tsx`)

A reusable form component for creating and editing posts.

**Props:**
```typescript
{
  post?: Post          // Optional: existing post for editing
  mode: 'create' | 'edit'  // Form mode
}
```

**Features:**
- Form validation
- Auto-slug generation
- Loading states
- Error handling
- Responsive design

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Add your MongoDB connection string:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog?retryWrites=true&w=majority
```

### 2. Install Dependencies

```bash
npm install
```

The system requires:
- `mongoose` - MongoDB ODM
- `next` - Next.js framework
- `react` - React library
- `typescript` - TypeScript support

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 4. Access Admin Panel

Navigate to `http://localhost:3000/admin` to access the admin dashboard.

## Usage Guide

### Creating a Post

1. Go to `/admin`
2. Click "New Post" button
3. Fill in the form:
   - **Title**: Enter your post title (slug auto-generates)
   - **Author**: Your name
   - **Excerpt**: Brief description (shown in listings)
   - **Content**: Full post content (markdown supported)
   - **Cover Image**: Optional image URL
   - **Tags**: Comma-separated tags
   - **Published**: Check to publish immediately
4. Click "Create Post"

### Editing a Post

1. Go to `/admin`
2. Find the post you want to edit
3. Click "Edit" button
4. Update the fields
5. Click "Update Post"

### Deleting a Post

1. Go to `/admin`
2. Find the post you want to delete
3. Click "Delete" button
4. Confirm the deletion

### Searching Posts

1. Go to `/admin`
2. Use the search bar at the top
3. Type to search by title, excerpt, or tags
4. Results filter in real-time

### Publishing a Draft

1. Edit the draft post
2. Check the "Publish this post" checkbox
3. Save the post
4. The `publishedAt` date will be set automatically

## Design Philosophy

The admin interface follows the minimalist design of the main blog:

- **Clean Typography**: Focus on readability
- **Minimal Color Palette**: Black, white, and subtle grays
- **Clear Hierarchy**: Important actions are prominent
- **Responsive Layout**: Works on all devices
- **Intuitive Navigation**: Clear paths between pages
- **Immediate Feedback**: Loading states and error messages

## Database Schema Details

### Indexes

The Post schema includes:
- Unique index on `slug` for fast lookups and duplicate prevention
- Timestamps for `createdAt` and `updatedAt`

### Validation

- `slug`: Required, unique, lowercase, trimmed
- `title`: Required, trimmed
- `excerpt`: Required, trimmed
- `content`: Required
- `author`: Required, trimmed
- `tags`: Array of strings, defaults to empty array
- `published`: Boolean, defaults to false

## Error Handling

The system includes comprehensive error handling:

- **API Level**: Try-catch blocks with appropriate HTTP status codes
- **Client Level**: Error states with user-friendly messages
- **Database Level**: Mongoose validation and unique constraint handling
- **Connection Issues**: Graceful handling of MongoDB connection failures

## Best Practices

### Slugs

- Keep slugs short and descriptive
- Use hyphens, not underscores
- Avoid special characters
- The system auto-generates slugs, but you can customize them

### Images

- Use high-quality cover images
- Recommended size: 1200x630px
- Use image hosting services (Unsplash, Cloudinary, etc.)
- Ensure HTTPS URLs for security

### Content

- Use markdown for formatting
- Keep excerpts under 160 characters for better SEO
- Use descriptive titles
- Add relevant tags for organization

### Tags

- Use lowercase for consistency
- Keep tags simple and broad
- Limit to 3-5 tags per post
- Use commas to separate tags

## Troubleshooting

### MongoDB Connection Issues

If you see "MongoDB URI not defined - using demo mode":
- Check your `.env.local` file
- Ensure `MONGODB_URI` is set correctly
- Verify your MongoDB cluster is accessible
- Check IP whitelist in MongoDB Atlas

### Posts Not Appearing

If posts don't show on the frontend:
- Ensure posts are marked as "published"
- Check that `publishedAt` date is set
- Verify the post exists in the database
- Check browser console for errors

### Slug Conflicts

If you get "A post with this slug already exists":
- Choose a different slug
- Or delete/update the existing post with that slug
- Slugs must be unique across all posts

## Future Enhancements

Potential features to add:

- Rich text editor (WYSIWYG)
- Image upload functionality
- Category system
- SEO metadata fields
- Scheduling posts for future publication
- User authentication
- Multiple author support
- Comment management
- Analytics integration
- Bulk actions

## API Authentication

**Note**: This implementation does not include authentication. For production use, add:

- API route protection
- Session management
- Role-based access control
- CSRF protection

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy!

### Other Platforms

The system works on any platform that supports:
- Node.js
- Next.js
- Environment variables
- MongoDB connectivity

## Support

For issues or questions:
- Check the Next.js documentation
- Review MongoDB connection guides
- Verify all dependencies are installed
- Check browser console for errors

## License

This blog management system is part of the Minimalist Blog template and follows the same license.

---

Built with Next.js, TypeScript, MongoDB, and Tailwind CSS.
