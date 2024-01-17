import {  useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS, FILTEREDBOOKS } from '../queries'
import { ref } from 'vue'
import { all } from 'axios'


const Books = (props) => {
  const[books, setBooks] = useState(props.books)
  const[genre, setGenres] = useState([])
  const { loading, error, data} = useQuery(FILTEREDBOOKS, {variables: {genres: genre}});
  
  const genres = books.map(book => book.genres).flat()
  let unique = genres.filter((item, i, ar) => ar.indexOf(item) === i);

  useEffect(() => {
    if(data){
      setBooks(data.allBooks)
    }  
  }
  ,[data])
    

  const setGenre = (genre) => {
    setGenres(genre)
  }

if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{genre}</strong></p>
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
      {unique.map((a) => (
        <button key={a} onClick={() => setGenre(a)}>{a}</button>
      ))}
      <button onClick={() => setGenre("")}>all genres</button>
      </div>
    </div>
  )
}

export default Books
