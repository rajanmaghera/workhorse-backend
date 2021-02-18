import { addResolveFunctionsToSchema } from 'apollo-server-express'
import { graphql, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import _ from 'lodash'

// Dummy Data

var books = [
    { name: 'abc', genre: 'fantasy', id: 1 },
    { name: 'def', genre: 'fantasy', id: 2 },
    { name: 'ghi', genre: 'romance', id: 3 }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return _.find(books, { id: args.id })
            }
        },
    }
})

export default new GraphQLSchema({
    query: RootQuery
})