import { addResolveFunctionsToSchema } from 'apollo-server-express'
import { graphql, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import _ from 'lodash'
import { gql } from 'apollo-server'
import mongoose from 'mongoose'
import Book from './schemas/Book.js'

const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];
  

// const EmployeeType = new GraphQLObjectType({
//     name: 'Employee',
//     fields: () => ({
//         id: { type: GraphQLID },
//         firstName: { type: GraphQLString },
//         lastName: { type: GraphQLString },
//         email: { type: GraphQLString },
//         managerID: { type: GraphQLID },
//         workplaceID: { type: GraphQLID }
//     })
// })

// const ManagerType = new GraphQLObjectType({
//     name: 'Manager',
//     fields: () => ({
//         id: { type: GraphQLID },
//         firstName: { type: GraphQLString },
//         lastName: { type: GraphQLString },
//         email: { type: GraphQLString },
//         workplaceID: { type: GraphQLID }
//     })
// })

// const WorkplaceType = new GraphQLObjectType({
//     name: 'Workplace',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         address: { type: GraphQLString }
//     })
// })

// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         employee: {
//             type: EmployeeType,
//             args: {
//                 id: { type: GraphQLID }
//             },
//             resolve(parent, args) {
//                 return 'hello!'
//             }
//         },

//         manager: {
//             type: ManagerType,
//             args: {
//                 id: { type: GraphQLID }
//             },
//             resolve(parent, args) {
//                 return 'hello!'
//             }
//         },
//         workplace: {
//             type: WorkplaceType,
//             args: {
//                 id: { type: GraphQLID }
//             },
//             resolve(parent, args) {
//                 return 'hello!'
//             }
//         },
//     }
// })

// export default new GraphQLSchema({
//     query: RootQuery
// })

export const typeDefs = gql`
    # Type Defs

    type Book {
        id: ID
        title: String
        author: String
    }

    # Query Type
    type Query {
        books: [Book]!
        book(title: String!): Book!

    }
`

export const resolvers =  {
    Query: {
        books: () => Book.find(),
        book: async (parent, args) => {
            const found = await Book.findOne({title: args.title}).exec()
            return found
        }
    }
}