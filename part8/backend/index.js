const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuid } = require('uuid');
const mongoose = require('mongoose')
const Author = require('./schema/AuthorSchema')
const Book = require('./schema/BookSchema')
const express = require('express')
const cors = require("cors");
const app = express()
require('dotenv').config()
const URL = process.env.MONGODB_URI
app.use(express.json())


app.use(cors());
  mongoose.connect(URL)
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message)
    })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]


let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = `
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
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genres: String): [Book!]!
        allAuthors: [Author!]!
    },
    type Mutation {  
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

const resolvers = {
    Query: {
        bookCount : () => books.length, 
        authorCount : () => authors.length,
        allBooks: async (root, args) => {
          console.log(args)
          console.log(args.author)
          console.log(args.genres)

          let name = args.author

            if (args.author && !args.genres) {
              console.log(args.author)
              let books = await Book.find({}).populate("author");
                return books
              }
            if (args.author && args.genres) {          
              let books = await Book.find({}).populate("author").populate("genres");
                return books
            }
            return books;
    },
    allAuthors: () => {
        const authorBookCountMap = {}
  
        books.forEach((book) => {
          if (authorBookCountMap[book.author]) {
            authorBookCountMap[book.author]++;
          } else {
            authorBookCountMap[book.author] = 1;
          }
        });
  
        const authorsWithBookCount = authors.map((author) => ({
          name: author.name,
          id: author.id,
          born: author.born,
          bookCount: authorBookCountMap[author.name] || 0,
        }));
  
        return authorsWithBookCount;
      },
    },
    Mutation: {
      addBook: async (root, args) => {
        // Find or create the author
        let author = await Author.findOne({ name: args.author });
    
        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }
    
        // Create the book with the author's ObjectId
        const book = new Book({ ...args, author: author});
    
        try {
          // Save the book to the database
          await book.save();
        } catch (error) {
          console.error("Error saving book:", error.message);
          throw new Error("Failed to save the book.");
        }
    
        return book;
      },
            
        editAuthor: (root, args) => {
            const author = authors.find((author) => author.name === args.name);
            if (!author) {
                return null;
            }
  
            const updatedAuthor = { ...author, born: args.setBornTo };
            authors = authors.map((author) =>
                author.name === args.name ? updatedAuthor : author
            );
            return updatedAuthor;
        },
    },
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})