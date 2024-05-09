const {gql} = require('apollo-server-express');

const typeDefs = gql`
type Query {
    me: User
}
type User{
    _id:ID
    username: String
    email: String!
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookId: ID!
    authors: [author]
    description: String
    title: String
    image: String
    link: String
}
Set up an Auth type to handle returning data from a profile creating or user login
type Auth {
    token: ID!
    user: User
}

`