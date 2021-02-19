import { graphql, buildSchema } from "graphql";
import express from "express";
import { graphqlHTTP } from "express-graphql";
//import schema from './schema.js'
import _ from 'lodash'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/workhorse2', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log("connected!")
})

// const single = new Book({title: "Lithium", author: "Never"})
// single.save()

// implementation 2:
import { ApolloServer, gql} from 'apollo-server'

import { typeDefs, resolvers } from './schema.js'

// const typeDefs = gql`
//     # Type Defs

//     type Book {
//         title: String
//         author: String
//     }

//     # Query Type
//     type Query {
//         books: [Book]!
//         book(title: String!): Book!

//     }
// `
// DUMMY


// const resolvers = {
//       Query: {
//           books: () => books,
//           book: (parent, args) => _.find(books, {title: args.title})
//       }
//   }

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})

// const app = express();

// app.use("/graphql", graphqlHTTP({
//     schema,
//     graphiql: true
// }));

// app.listen(4000, () => {
//     console.log("Now listening on port 4000");
// });
