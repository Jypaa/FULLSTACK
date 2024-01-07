import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useReducer } from 'react'


export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.data
    case 'CLEAR':
      return ''
    default:
      return state
  }
}
export const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.data
    case 'CLEAR':
      return ''
    default:
      return state
  }
}



const App = () => {
  //const [blogs, setBlogs] = useState([])
  const queryClient = useQueryClient()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useReducer(userReducer, null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')
  const [Message, setMessage] = useReducer(notificationReducer, '')
  const [loginVisible, setLoginVisible] = useState(false)
  const [BlogVisible, setBlogVisible] = useState(false)


  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const newBlogMutation = useMutation({ 
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['blogs']})
    }
  })

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  if( result.isError ) {
    return <div>blog service not avaible due problems in server</div>
  }

  const blogs = result.data

  const updateBlog = async (updatedBlogId) => {
    console.log('updated blog id', blogs);
    try {
      const blogToUpdate = blogs.find((blog) => blog.id === updatedBlogId);
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,  
      }
      
      await updateBlogMutation.mutateAsync({updatedBlog} );
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await removeBlogMutation.mutateAsync(blogId);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  }

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
      setUser({ type: 'SET', data: user })
      setUsername('')
      setPassword('')
      const blogs = await blogService.getAll()
      sorting(blogs)
      setBlogs(blogs)
      setBlogVisible(false)
    } catch (exception) {
      setMessage({ type: 'SET', data: 'wrong credentials' })

      setTimeout(() => {
        setMessage({ type: 'CLEAR' })
      }, 5000)
    }
  }

  

  const handleBlog = async (event) => {
    event.preventDefault();
    try {
      const blogObject = {
        title,
        author,
        url,
      };
      await newBlogMutation.mutateAsync(blogObject, {
        onSuccess: () => {
          setMessage({ type: 'SET', data: `Blog ${blogObject.title} added` });
          setTimeout(() => {
            setMessage({ type: 'CLEAR' });
          }, 5000);
        },
      });  
      setTitle('');
      setAuthor('');
      setUrl('');
      setBlogVisible(false);
    } catch (exception) {
      console.error('Error creating blog:', exception);
    }
  };

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
      setUser({ type: 'CLEAR' })
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
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
      )}


    </div>
  )
}


export default App