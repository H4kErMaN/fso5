const LoginForm = ({
  handleSubmit,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label>username</label>
      <input
        type="text"
        value={username}
        name="Username"
        placeholder="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      <label>password</label>
      <input
        type="password"
        value={password}
        name="Password"
        placeholder="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm
