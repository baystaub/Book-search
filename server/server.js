const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
<<<<<<< HEAD
const { typeDefs, resolvers } = require('./schema');
=======
const { typeDefs, resolvers } = require('./schemas');
>>>>>>> 2c8feec68b381b35f0c001b87296d71d273076ae
const { authMiddleware } = require('./utils/auth');
const app = express();

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`),
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`));

});
