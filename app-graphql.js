import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server'
import { typeDefs, resolvers } from './schema.js'

// Connect to DB

mongoose.connect('mongodb://localhost/workhorse2', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log("connected!")
})

// Create GraphQL Server

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})


// import Book from './schemas/Book.js'
//
// const obj = new Book({title: "Lord of the Flies", author: "William Golding"})
// obj.save()
