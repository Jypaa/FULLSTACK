import { useState } from 'react'
import blogService from '../services/blogs'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'

const Blog = ({ blog}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

    return (  
      <div style={blogStyle} className='blog'>
        <p>
          {blog.title}
        </p>
      </div>

    )
  
}

export default Blog