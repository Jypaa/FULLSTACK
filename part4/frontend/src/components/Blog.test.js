import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


test('renders content', () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Test Author",
    url: "www.test.com",
    likes: 5,
     
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library Test Author')
})


test('clicking the button calls event handler once', async() => {

  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Test Author",
    url: "www.test.com",
    likes: 5,
    user: {
      name: "Jyri"
    } 
  }

  const user = userEvent.setup()
  const mockHandler = jest.fn()

  render(<Blog blog={blog} setBlogVisible={mockHandler}/>)

  const button = screen.getAllByRole('button' , {name: "Show"})
  await user.click(button[0])

  screen.getByText('www.test.com')
  screen.getByText("Likes: 5")
  screen.getByText('User: Jyri')
  }
)

//It runs correctly but crash backend, because in header there is no token
//didn't know how to disable for testing.Error comes from Blog.jsx line 17 blogservice.update
test('clicking vote twice will call vote handler twice', async() => {

    const blog = {
      id: "5a451df7571c224a31b5c8ce",
      title: "Component testing is done with react-testing-library",
      author: "Test Author",
      url: "www.test.com",
      likes: 5,
      user: {
        name: "Jyri"
      } 
    }
  
    const user = userEvent.setup()
    const mockHandler = jest.fn()
    const mockVoteHandler = jest.fn()  

    render(<Blog blog={blog} setBlogVisible={mockHandler} updateBlog={mockVoteHandler}/>)
  
    const button = screen.getAllByRole('button' , {name: "Show"})
    await user.click(button[0])
  
    const button2 = screen.getByText('vote')
    await user.click(button2)
    await user.click(button2)

    await expect(mockVoteHandler.mock.calls.length).toEqual(2)

  }
)

test('calls handleSubmit with the correct values when the form is submitted', async () => {
  const props = {
    handleSubmit: jest.fn(),
    handleTitleChange: jest.fn(),
    handleAuthorChange: jest.fn(),
    handleUrlChange: jest.fn(),
    title: '',
    author: '',
    url: ''
  };

  const { getByText } = render(<BlogForm {...props} />);

  const user = userEvent.setup()

  const titleInput = screen.getByText(/title/i).nextElementSibling; 
  const authorInput = screen.getByText(/author/i).nextElementSibling;
  const urlInput = screen.getByText(/url/i).nextElementSibling;

  await user.type(titleInput, 'Test Title');
  await user.type(authorInput, 'Test Author');
  await user.type(urlInput, 'http://example.com');

  fireEvent.click(getByText("create"));

    expect.objectContaining({
      title: 'Test Title',
      author: 'Test Author',
      url: 'http://example.com'
    })
});








