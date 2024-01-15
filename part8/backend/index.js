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
        bookCount : async() => {
          let books = await Book.find({});
          return books.length;
        },
        authorCount : async () => {
          let authors = await Author.find({});
          return authors.length;
        },
        allBooks: async (root, args) => {
          console.log(args)
          console.log(args.author)
          console.log(args.genres)


            if (args.author) {
              console.log("täällä",args.author)
              let author = args.author
              let books = await Book.find({}).populate("author");
                return books
              }
            if (args.genres) {  
              console.log("here",args.genres)
              let genre = args.genres
              let books = await Book.find({genres: { $in: genre }}).populate("author");
              return books
            }

            if(!args.author && !args.genres) {
            let books = await Book.find({}).populate("author");
            return books
            }
            
    },
    allAuthors: async () => {
      let authors = await Author.find({});
      return authors;
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
            
        editAuthor: async (root, args) => {
          console.log(args)
          let author = await Author.findOne({ name: args.name });
          if (!author) {
              return null;
          }          
          author.born = args.setBornTo;
          const updatedAuthor = await author.save();

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