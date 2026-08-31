import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import BlogView from './BlogView'

const blog = {
  id: 'blog1',
  title: 'Component testing is done with react-testing-library',
  author: 'Test Author',
  url: 'https://example.com/testing',
  likes: 5,
  user: {
    id: 'user1',
    username: 'testuser',
    name: 'Test User',
  },
}

const renderWithRouter = (currentUser, handleLike = () => {}, handleRemove = () => {}) => {
  return render(
    <MemoryRouter initialEntries={['/blogs/blog1']}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <BlogView
              blogs={[blog]}
              user={currentUser}
              handleLike={handleLike}
              handleRemove={handleRemove}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  )
}

describe('<BlogView />', () => {
  test('anonymous user sees blog info and likes but no buttons (5.27)', () => {
    renderWithRouter(null)

    // Blogin tiedot näkyvät
    expect(screen.getByText(/Component testing.*Test Author/)).toBeInTheDocument()
    expect(screen.getByText(blog.url)).toBeInTheDocument()
    expect(screen.getByText(/5 likes/)).toBeInTheDocument()

    // Nappeja ei näytetä kirjautumattomalle
    expect(screen.queryByRole('button', { name: 'like' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'remove' })).not.toBeInTheDocument()
  })

  test('logged-in non-owner sees only like button (5.27)', () => {
    const otherUser = { id: 'other-user', name: 'Other User' }
    renderWithRouter(otherUser)

    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'remove' })).not.toBeInTheDocument()
  })

  test('creator sees both like and remove buttons (5.27)', () => {
    const owner = { id: 'user1', name: 'Test User' }
    renderWithRouter(owner)

    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'remove' })).toBeInTheDocument()
  })
})
