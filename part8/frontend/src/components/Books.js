import {  useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { FILTEREDBOOKS } from '../queries'
import { set } from 'mongoose'


const Books = (props) => {
  const[books, setBooks] = useState(props.books)
  const[genre, setGenres] = useState([])
  const { loading, error, data } = useQuery(FILTEREDBOOKS, {variables: {genres: genre}});
  
  console.log(props)

  console.log(books)
  const genres = books.map(book => book.genres).flat()
  let unique = genres.filter((item, i, ar) => ar.indexOf(item) === i);
  console.log(unique)

  useEffect(() => {
    if(data){
      setBooks(data.allBooks)
    }
    
  }
  ,[data])
    

const setGenre = async (genre) => {
  await setGenres(genre)
  console.log(genre)

  console.log(data)
}

/*
const setGenre = (genre) => {
  setGenres(genre)
  console.log(genre)
  if(genre === "") {
    setBooks(props.books)
  }
  else{
    let booksFiltered = props.books.filter(book => book.genres.includes(genre))
    setBooks(booksFiltered)
  }
}

*/
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
