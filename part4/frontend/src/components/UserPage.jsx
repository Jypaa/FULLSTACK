import {
    BrowserRouter as Router,
    Routes, Route, Link, useParams, useNavigate
  } from 'react-router-dom'

const UserPage = (blogs) => {
    const id = useParams().id   
    if (!id || blogs.blogs === undefined) {
          return null
    
    }


  const user = blogs.users.find(user => user.id === id)
  if(!user) {
    return null
  }
  return (
    <div>
      <h1>{user.username}</h1>
      <h2>added blogs</h2>  
      
      <table>    
        <tbody>
          {blogs.blogs.map(blog =>
            <tr key={blog.id}>
              <td>{blog.title}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}
export default UserPage