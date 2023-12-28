import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, updateBlog}) => {
  const [BlogVisible, setBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addVote = () => {
    blogService.update(blog.id,{ likes: blog.likes + 1, })
    
    updateBlog(blog.id);
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog.id)
      setBlogVisible(false)

    }
  }

  if (BlogVisible === false) {
    return (
       
      <div style={blogStyle} className='blog'>
        <p>
          {blog.title} {blog.author}{' '}
          <button onClick={() => setBlogVisible(true)}>Show</button>
        </p>
      </div>

    )
  } else {
    return (

      <div style={blogStyle} className='blog'>
        <p>
          {blog.title} {blog.author}{' '}
          <button onClick={() => setBlogVisible(false)}>Hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          Likes: {blog.likes}
          <button onClick={addVote}>vote</button>
        </p>
        <p>User: {blog.user.name}</p>

        {JSON.stringify(blog.user.username) === window.localStorage.getItem('username') ? (
          <p><button onClick={deleteBlog}>Remove</button></p>) : ('')}

      </div>

    )
  }
}

export default Blog