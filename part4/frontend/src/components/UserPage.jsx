import {
    BrowserRouter as Router,
    Routes, Route, Link, useParams, useNavigate
  } from 'react-router-dom'


const UserPage = (blogs) => {
    const id = useParams().id   
    if (!id || blogs.blogs === undefined) {
          return null
    
    }


console.log('blogs', blogs)
console.log('id', id)
//const usersBlogs = blogs.filter(blog => blog.user.id === id)
//console.log('usersBlogs', usersBlogs)
        
        
        return (
          <div>
            <tbody>




            </tbody>

        </div>
        )
      }
export default UserPage