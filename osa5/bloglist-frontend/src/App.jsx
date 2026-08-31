import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import BlogView from './components/BlogView'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    type: 'success'
  })

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: 'success' })
    }, 5000)
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      return true
    } catch {
      showNotification('wrong username or password', 'error')
      return false
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      showNotification(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`
      )
      return true
    } catch {
      showNotification('failed to add blog', 'error')
      return false
    }
  }

  const handleLike = async (blog) => {
    try {
      const updatedBlog = {
        user: blog.user?.id || blog.user,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      }
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map(b =>
        b.id !== blog.id
          ? b
          : { ...returnedBlog, user: blog.user }
      ))
    } catch {
      showNotification('failed to like blog', 'error')
    }
  }

  const handleRemove = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      showNotification(`Removed ${blog.title}`)
    } catch {
      showNotification('failed to remove blog', 'error')
    }
  }

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navigation user={user} handleLogout={handleLogout} />
        <div className="content">
          <Notification
            message={notification.message}
            type={notification.type}
          />
          <Routes>
            <Route path="/" element={<Home blogs={blogs} />} />
            <Route
              path="/blogs/:id"
              element={
                <BlogView
                  blogs={blogs}
                  user={user}
                  handleLike={handleLike}
                  handleRemove={handleRemove}
                />
              }
            />
            <Route
              path="/create"
              element={
                <CreateBlog
                  user={user}
                  handleCreateBlog={handleCreateBlog}
                />
              }
            />
            <Route
              path="/login"
              element={<Login user={user} handleLogin={handleLogin} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
