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
          <input
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
        author
          <input
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
        url
          <input
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit" >create</button>
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