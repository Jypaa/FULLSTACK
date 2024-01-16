import ReactDOM from 'react-dom/client'
import App from './App'

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phonenumbers-user-token')
  if(!token) {
    return null
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : null,
    }
  }
})


const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(

  <ApolloProvider client={client}>
    <App />

  </ApolloProvider>
)