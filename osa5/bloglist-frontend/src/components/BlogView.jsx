import { useParams, useNavigate } from 'react-router-dom'

const BlogView = ({ blogs, user, handleLike, handleRemove }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return (
      <div className="blog-view">
        <p>Blog not found</p>
      </div>
    )
  }

  const blogUserId = typeof blog.user === 'string'
    ? blog.user
    : blog.user?.id

  const canRemove = user && blogUserId === user.id

  const onRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await handleRemove(blog)
      navigate('/')
    }
  }

  return (
    <div className="blog-view blog">
      <h2>{blog.title} by {blog.author}</h2>
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
      </div>
      <div className="likes-row">
        <span>{blog.likes} likes</span>
        {user && (
          <button className="like-btn" onClick={() => handleLike(blog)}>
            like
          </button>
        )}
      </div>
      {blog.user?.name && (
        <p className="added-by">added by {blog.user.name}</p>
      )}
      {canRemove && (
        <button className="remove-btn" onClick={onRemove}>
          remove
        </button>
      )}
    </div>
  )
}

export default BlogView
