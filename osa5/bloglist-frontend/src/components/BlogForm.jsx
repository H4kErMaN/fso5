import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="blog-form-container">
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>title:</label>
          <input
            type="text"
            value={title}
            name="Title"
            placeholder="write blog title here"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label>author:</label>
          <input
            type="text"
            value={author}
            name="Author"
            placeholder="write blog author here"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label>url:</label>
          <input
            type="text"
            value={url}
            name="Url"
            placeholder="write blog url here"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
