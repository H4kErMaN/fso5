import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls createBlog callback with correct data when form is submitted (5.16)', async () => {
    const createBlog = vi.fn()
    const testUser = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('write blog title here')
    const authorInput = screen.getByPlaceholderText('write blog author here')
    const urlInput = screen.getByPlaceholderText('write blog url here')
    const submitButton = screen.getByText('create')

    await testUser.type(titleInput, 'Testing a form')
    await testUser.type(authorInput, 'John Tester')
    await testUser.type(urlInput, 'https://testing.example.com')
    await testUser.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'Testing a form',
      author: 'John Tester',
      url: 'https://testing.example.com',
    })
  })
})
