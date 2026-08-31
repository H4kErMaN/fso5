import { Navigate, useNavigate } from 'react-router-dom'
import BlogForm from './BlogForm'

const CreateBlog = ({ user, handleCreateBlog }) => {
  const navigate = useNavigate()

  // Jos ei kirjautunut, ohjataan kirjautumissivulle
  if (!user) {
    return <Navigate to="/login" replace />
  }

  const onCreate = async (newBlog) => {
    const success = await handleCreateBlog(newBlog)
    if (success) {
      navigate('/')
    }
  }

  return <BlogForm createBlog={onCreate} />
}

export default CreateBlog
