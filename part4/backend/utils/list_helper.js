const dummy = (blogs) => {
    return 1;
  }
  

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
      return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
  }  

const favoriteBlog = (blogs) => {
    const favoriteBlog = {
        _id: "",
        title: "",
        author: "",
        url: "",
        likes: 0,
        __v: 0
      }  

    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > favoriteBlog.likes) {
            favoriteBlog._id = blogs[i]._id
            favoriteBlog.title = blogs[i].title
            favoriteBlog.author = blogs[i].author
            favoriteBlog.url = blogs[i].url
            favoriteBlog.likes = blogs[i].likes
            favoriteBlog.__v = blogs[i].__v
        }
    }
    return favoriteBlog
}
  


const mostBlogs = (blogs) => {
    const countMap = {};
    const authors = [] 

    blogs.forEach((blogs) => {
        authors[blogs.author] = (authors[blogs.author] || 0) + 1;
      });

      for (const [author, value] of Object.entries(countMap)) {
        if (value > 1) {
          authors.push({
            author: author,
            blogs: value,
          });
        }
      }
    
      return authors;
    


    }
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }