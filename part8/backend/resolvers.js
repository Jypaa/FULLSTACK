const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./schema/AuthorSchema')
const Book = require('./schema/BookSchema')
const Kayttaja = require('./schema/UserSchema')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
        me: (root, args, context) => {
          return context.currentUser
        },
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
      createUser: (root, args) => {
        const user = new Kayttaja({ username: args.username, favoriteGenre: args.favoriteGenre })
    
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await Kayttaja.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          }) 
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser

        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        let author = await Author.findOne({ name: args.author });
        if (args.title.length < 5) {
          throw new GraphQLError('Title too short', {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          },
          );
        }
        if (!author) {
          if (args.author.length < 4) {
            throw new GraphQLError('Name too short', {
              extensions: {
                code: 'BAD_USER_INPUT',
              },
            },
            );
          }
          author = new Author({ name: args.author });
          await author.save();
        }
        
        const book = new Book({ ...args, author: author});

        try {
          await book.save();
        } catch (error) {
          console.error("Error saving book:", error.message);
          throw new Error("Failed to save the book.");
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book;
      },
            
        editAuthor: async (root, args, context) => {
          const currentUser = context.currentUser

        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
          let author = await Author.findOne({ name: args.name });
          if (!author) {
            throw new GraphQLError('Name not found', {
              extensions: {
                code: 'BAD_USER_INPUT',
              },
            });
          }          
          author.born = args.setBornTo;
          const updatedAuthor = await author.save();

          return updatedAuthor;
        },
    },
    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
      },
}

module.exports = resolvers