import {
    BrowserRouter as Router,
    Routes, Route, Link, useParams, useNavigate
  } from 'react-router-dom'


const BlogPage = ({blogs, updateBlog, deleteBlog, comment}) => {
    const id = useParams().id   
    if (!blogs) {
        return null
    }

    const blog = blogs.find(blog => blog.id === id)
    return (
    <div>
        <h1>{blog.title}</h1>
        <p>{blog.url}</p>
        <p>{blog.likes}</p>
        <button onClick={() => updateBlog(blog.id)}>like</button>
        <p>added by {blog.author}</p>
        <button onClick={() => deleteBlog(blog.id)}>remove</button>
        <h2>comments</h2>
        <form onSubmit={(event) => {
                event.preventDefault();
                const commentInput = event.target.elements.comment.value;
                comment(blog.id, commentInput);
                event.target.elements.comment.value = '';
                }}>
            <input type="text" name="comment" />
            <button type="submit">add comment</button>
        </form>
        {blog.comments.map(comment =>
            <li key={comment.id}>{comment}</li>
        )}
    </div>
    )
}

export default BlogPage