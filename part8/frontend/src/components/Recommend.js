import {  useQuery } from '@apollo/client'
import { useState, useEffect} from 'react'
import { ME } from '../queries'

const Books = (props) => {
  const[books, setBooks] = useState([])
  const[genre, setGenres] = useState([])
  const { loading, error, data } = useQuery(ME);
  

  useEffect(() => {
    if (data) {
      let booksFiltered = props.books.filter(book => book.genres.includes(data.me.favoriteGenre))
      setGenres(data.me.favoriteGenre)
      setBooks(booksFiltered)
    }
  },[data])



if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>Favorite genre <strong>{genre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      </div>
    </div>
  )
}

export default Books
