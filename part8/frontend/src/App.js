import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {gql, useQuery, useApolloClient, useSubscription } from '@apollo/client'
import Login from './components/LoginForm'
import Recommed from './components/Recommend'
import { BOOK_ADDED, ALL_BOOKS, QUERY } from './queries'


export const updateCache = (cache, query, addedBook) => {

  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}


const App = () => {
  const result = useQuery(QUERY, {
      pollInterval: 5000
    })
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

    useSubscription(BOOK_ADDED, {
      onData: ({ data }) => {
        const addedBook = data.data.bookAdded
        alert(`${addedBook.title} added`)

        client.cache.updateQuery({query: ALL_BOOKS }, ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(addedBook),
          }
        })
      }
    })
    const logout = () => {
      setToken(null)
      localStorage.clear()
      client.resetStore()
    }

    if (result.loading)  {
      return <div>loading...</div>
    }
    if (result.error) {
      console.log(result.error)
      return <div>error... </div>
    }
    console.log(result.data)

    
  
    if (!token) {
      return (
        <div>
          <div>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            <button onClick={() => setPage('login')}>login</button> 
          </div>

            <Authors show={page === 'authors' } authors={result.data.allAuthors} />
  
            <Books show={page === 'books'} books={result.data.allBooks}/>
            
            <Login show={page === 'login' } setToken={setToken}/>

        </div>
      )
      
    }
  else{
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={logout}>logout</button>
        </div>
        <Authors show={page === 'authors' } authors={result.data.allAuthors} token={token} />

        <Recommed show={page === 'recommend'} books={result.data.allBooks} token={token}/>

        <Books show={page === 'books'} books={result.data.allBooks}/>

        <NewBook show={page === 'add'} />

    </div>
  )
  }
}

export default App
