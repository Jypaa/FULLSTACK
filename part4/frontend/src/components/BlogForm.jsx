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
      <form >
        <div>
        title
          <input 
            type='text'
            id='title'
            key='title'
            className='title'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
        author
          <input 
            type='text'
            id='author'
            key='author'
            className='author'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
        url
          <input 
            type='text'
            id='url'
            key='url'
            className='url'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button onClick={handleSubmit} id='create' className='create' type="submit" >create</button>
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