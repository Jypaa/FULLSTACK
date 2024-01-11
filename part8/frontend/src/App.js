import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {gql, useQuery } from '@apollo/client'


const query = gql`
      query {
        allAuthors  {
          name,
          born,
          bookCount
          id
        },
        allBooks  {
          title,
          author,
          published,
          genres
  
        }
      }
    `

const App = () => {
  const [page, setPage] = useState('authors')

    const result = useQuery(query, {
      pollInterval: 5000
    })

    if (result.loading)  {
      return <div>loading...</div>
    }
    if (result.error) {
      console.log(result.error)
      return <div>error... </div>
    }
    console.log(result.data)


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors' } authors={result.data.allAuthors} />

      <Books show={page === 'books'} books={result.data.allBooks}/>

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
