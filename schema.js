import { graphql, GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql'

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: { type: BookType },
        args: { id: { type: GraphQLID } }
    }
})