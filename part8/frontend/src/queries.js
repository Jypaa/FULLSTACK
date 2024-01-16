import {gql} from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value      
    }
  }
`;

export const ME = gql`
    query{
        me {
            username
            favoriteGenre
        }
    }
`;

export const FILTEREDBOOKS = gql`
    query allBooks($genres: String){
        allBooks(genres: $genres) {
            title
            author {
                name
            }
            published
            genres
        }
    }
`;


export const QUERY = gql`
      query {
        allAuthors  {
          name,
          born,
          bookCount
          id
        },
        allBooks  {
          title,
          author{
            name
          },
          published,
          genres
  
        }
      }
`;

export const CREATE_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String]){
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ){
      title
      author{
        name
      }
      published
      genres
    }
  }
`

