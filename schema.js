import { gql } from 'apollo-server'
import Employee from './schemas/Employee.js'
import Book from './schemas/Book.js'

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



export const typeDefs = gql`

    # Type Defs
    type Book {
        id: ID
        title: String
        author: String
    }

    type Employee {
        id: ID
        first: String
        last: String
        #dob: Date
        role: String
        email: String
        managerID: ID
        workplaceID: ID
    }

    type Manager {
        id: ID
        first: String
        last: String
        #dob: Date
        email: String
        workplaceID: ID
        employeeIDs: [ID]
    }

    type Workplace {
        id: ID
        name: String
        address: String
        employees: [Employee]
    }

    # Query Type
    type Query {
        books: [Book]!
        book(title: String!): Book!
        employees: [Employee]!
        employee(id: ID!): Employee!
    }

    # Mutations
    type Mutation {
      addBook(title: String!, author: String!): Book!
    }

`

export const resolvers = {
    Query: {
        books: async () => await Book.find().sort({_id: -1}),
        book: async (parent, args) => await Book.findOne({ title: args.title }).exec(),
        employees: async () => await Employee.find(),
        employee: async (parent, args) => await Employee.findOne({ _id: args.id })
    },
    Mutation: {
      addBook: async (_, args) => {
        const book = await new Book({title: args.title, author: args.author})
        book.save()
        return book
      }
    }
}
