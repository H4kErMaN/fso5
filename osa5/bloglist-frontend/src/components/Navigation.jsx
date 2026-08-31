import { Link } from 'react-router-dom'

const Navigation = ({ user, handleLogout }) => (
  <div className="nav-bar">
    <Link to="/">blogs</Link>
    {user && <Link to="/create">create new blog</Link>}
    <div className="user-info">
      {user
        ? (
          <>
            <span>{user.name} logged in</span>
            <button onClick={handleLogout}>logout</button>
          </>
        )
        : <Link to="/login">login</Link>
      }
    </div>
  </div>
)

export default Navigation
