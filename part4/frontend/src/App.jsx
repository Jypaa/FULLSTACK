import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [Message, setMessage] = useState(null)

  useEffect(() => {
    if(window.localStorage.token) {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )}
  }, [])

  
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
      useEffect(() => {
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )}
      )
    } catch (exception) {
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = await blogService.create({
        title, author, url
      })
      setBlogs(blogs.concat(blogObject))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`Blog ${blogObject.title} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }
  catch (exception) {
    setTimeout(() => {
      console.log('error')
    }, 5000)
  }
}
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" onClick={handleLogin}>login</button>
    </form>      
  )

  const createBlog = () => (
    <form>
      <div>
        title
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
          />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
          />
      </div>
      <button type="submit" onClick={addBlog}>create</button>
    </form>
  )

  const handlelogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('username')
      setUser(null)
    } catch (exception) {
    }
  }

  if (window.localStorage.token == null) {
    
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={Message} />
        <form>
        {loginForm()}
        </form>
      </div>
    )
  }

  return (
    
    <div>
      <h2>blogs</h2>
      <p>{JSON.parse(window.localStorage.getItem('user'))} logged in</p>
      <form>
        <button type="submit" onClick={handlelogout}>logout</button>
      </form>
      
      <h2>create new</h2>
      <Notification message={Message} />
      <form>
        {createBlog()}
      </form>

    <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

      
    </div>
  )}


export default App