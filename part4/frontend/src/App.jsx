import { useState, useEffect, Suspense, useCallback } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'
import UsersPage from './components/UsersPage'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useReducer } from 'react'
import UserPage from './components/UserPage'
import BlogPage from './components/BlogPage'
import e from 'express'

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
  const queryClient = useQueryClient()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useReducer(userReducer, '')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')
  const [Message, setMessage] = useReducer(notificationReducer, '')
  const [loginVisible, setLoginVisible] = useState(false)
  const [BlogVisible, setBlogVisible] = useState(false)
  
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })


  if( result.isError ) {
    return <div>blog service not avaible due problems in server</div>
  }
  
  const userResult = useQuery({
    queryKey: ['users'],
    queryFn: blogService.getUsers
  })

  const users = userResult.data
  const blogs = result.data   


  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const commentBlogMutation = useMutation({
    mutationFn: blogService.comment,
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

  const commentBlog = async (blogId, comment) => {
    const comments = {
      comment,
      blogId
    }
    try {
      await commentBlogMutation.mutateAsync(comments);
    }
    catch (error) {
      console.error('Error commenting blog:', error);
    }
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
            key="blogform"
            title={title}
            author={author}
            url={url}
            handleTitleChange={( {target }) => setTitle(target.value)}
            handleAuthorChange={( {target }) => setAuthor(target.value)}
            handleUrlChange={( {target} ) => setUrl(target.value)}
            handleSubmit={handleBlog}
          />

          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const Frontpage = () => {
    return(

    <div>
      <div id="addBlog">
      <h2>add new blog</h2>
      <Notification message={Message} />
      {blogForm()}

    </div>
    <div id="blogs">
      <h2>blogs</h2>
      {Array.isArray(blogs) && blogs.map(blog =>
        <Link key={blog.id} to={`/blogs/${blog.id}`}><Blog key={blog.id} blog={blog}  /></Link>
      )}
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
    <Router>
          <Link to='/'>blogs </Link>
          <Link to='/users'>users</Link>
          <h2>blogs</h2>
          <p>{JSON.parse(window.localStorage.getItem('user'))} logged in</p>
          <button type="submit" onClick={handlelogout}>logout</button>
    <Routes>
      <Route path='/' element={<Frontpage blogs={blogs}/>} />
      <Route path='/users' element={<UsersPage users={users}/>} />
      <Route path='/users/:id' element={<UserPage blogs={blogs} users={users}/>} />
      <Route path='/blogs/:id' element={<BlogPage blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} comment={commentBlog}/>} />
    </Routes>
    </Router>
  )
}

export default App