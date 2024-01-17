const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { GraphQLError } = require('graphql');
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const http = require('http')
const Kayttaja = require('./schema/UserSchema')
const express = require('express')
const cors = require("cors");
const app = express()
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')


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

const start = async () => {
      const app = express()
      const httpServer = http.createServer(app)

      const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/',
      })

      const schema = makeExecutableSchema({ typeDefs, resolvers })
      const serverCleanup = useServer({ schema }, wsServer)

      const server = new ApolloServer({
        schema: makeExecutableSchema({ typeDefs, resolvers }),
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
          {
            async serverWillStart() {
              return {
                async drainServer() {
                  await serverCleanup.dispose();
                },
              };
            },
          },
        ],
      })
      await server.start()
      app.use(
        '/',
        cors(),
        express.json(),
        expressMiddleware(server, {
          context: async ({ req }) => {
            const auth = req ? req.headers.authorization : null
            if (auth ) {
              const decodedToken = jwt.verify(
                auth, process.env.JWT_SECRET
              )
        
              const currentUser = await Kayttaja
                .findById(decodedToken.id)
              return { currentUser }
            }
          },
        }),
      )
      const PORT = 4000
      httpServer.listen(PORT, () =>
        console.log(`Server is now running on http://localhost:${PORT}`)
      )
    }
    start()