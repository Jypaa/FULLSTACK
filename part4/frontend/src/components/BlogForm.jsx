import PropTypes from 'prop-types'

const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
        title
          <input className='title'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
        author
          <input className='author'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
        url
          <input className='url'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button className='create' type="submit" >create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm