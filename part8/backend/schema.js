const typeDefs = `
    type Subscription {
        bookAdded: Book!
    }   
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    },
    type Author {
        name: String!
        id: String!
        born: Int
        bookCount: Int
    },
    type Kayttaja {
      username: String!
      favoriteGenre: String!
      id: ID!
    },
    type Token {
      value: String!
    },
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genres: String): [Book!]!
        allAuthors: [Author!]!
        me: Kayttaja
    },
    type Mutation {  
        createUser(
          username: String!
          favoriteGenre: String!
        ): Kayttaja
        login(
          username: String!
          password: String!
        ): Token
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String]
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    },
`

module.exports = typeDefs