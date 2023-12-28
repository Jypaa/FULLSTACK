import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { set } from 'mongoose'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')
  const [Message, setMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [BlogVisible, setBlogVisible] = useState(false)


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (window.localStorage.token) {
          const blogs = await blogService.getAll();
          sorting(blogs);
          setBlogs(blogs);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
  
    fetchBlogs();
  }, []);

const  sorting = (blogs) => {
    blogs.sort((a, b) => b.likes - a.likes)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('token', JSON.stringify(user.token))
      window.localStorage.setItem('user', JSON.stringify(user.name))
      window.localStorage.setItem('username', JSON.stringify(user.username))

      loginService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      const blogs = await blogService.getAll()
      sorting(blogs)
      setBlogs(blogs)
      setBlogVisible(false)
    } catch (exception) {
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (updatedBlogId) => {
    try {
      const blog = blogs.find((blog) => blog.id === updatedBlogId);
      console.log('index',blog)
      const updatedLikes = blog.likes + 1;
    await setBlogs((prevBlogs) => {
      const updatedBlogs = [...prevBlogs];
      const index = updatedBlogs.findIndex((b) => b.id === updatedBlogId);
      if (index !== -1) {
        updatedBlogs[index] = { ...updatedBlogs[index], likes: updatedLikes };
      }
      sorting(updatedBlogs)
      return updatedBlogs;
    });
      
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const handleBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = await blogService.create({
        title, author, url
      })
      console.log('täää',blogObject)
      setBlogs(blogs.concat(blogObject))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`Blog ${blogObject.title} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setBlogVisible(false)
      this.forceRender()
    }
    catch (exception) {
      setTimeout(() => {
        console.log('error')
      }, 5000)
    }
  }

  const blogForm = () => {
    const hideWhenVisible = { display: BlogVisible ? 'none' : '' }
    const showWhenVisible = { display: BlogVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button className='newBlog' onClick={() => setBlogVisible(true)}>create new</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            title={title}
            author={author}
            url={url}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            handleSubmit={handleBlog}
          />
          
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )

  }


  const handlelogout = (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('username')
      setUser(null)
      setLoginVisible(false)

    } catch (exception) {
      console.log('error',exception)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )


  }
  
  if (window.localStorage.token === null || window.localStorage.token === undefined) {

    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={Message} />
        {loginForm()}

      </div>
    )
  }
  
  return (

    <div>
      <h2>blogs</h2>
      <p>{JSON.parse(window.localStorage.getItem('user'))} logged in</p>

      <button type="submit" onClick={handlelogout}>logout</button>

      <h2>add new blog</h2>
      <Notification message={Message} />
      {blogForm()}


      <h2>blogs</h2>
      {Array.isArray(blogs) && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      )}


    </div>
  )
}


export default App