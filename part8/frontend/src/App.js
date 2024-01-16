import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {gql, useQuery, useApolloClient } from '@apollo/client'
import Login from './components/LoginForm'
import Recommed from './components/Recommend'
import { QUERY } from './queries'


 

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()
  console.log(client)
    const result = useQuery(QUERY, {
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

    const logout = () => {
      setToken(null)
      localStorage.clear()
      client.resetStore()
    }
  
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
