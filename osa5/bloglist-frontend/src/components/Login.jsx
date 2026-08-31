import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import LoginForm from './LoginForm'

const Login = ({ user, handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  // Jos jo kirjautunut, ohjataan pääsivulle
  if (user) {
    return <Navigate to="/" replace />
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const success = await handleLogin(username, password)
    if (success) {
      setUsername('')
      setPassword('')
      navigate('/')
    }
  }

  return (
    <div className="login-container">
      <h2>Log in to application</h2>
      <LoginForm
        handleSubmit={onSubmit}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    </div>
  )
}

export default Login
