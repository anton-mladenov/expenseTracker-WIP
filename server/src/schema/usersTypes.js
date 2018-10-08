import { gql } from "apollo-server-express"

export default gql`

type User {
    id: ID
    name: String!
    email: String
    role: String
    categories: [Category]
}

extend type Query {
    user(id: ID!): User
    allUsers: [User]
}

extend type Mutation {
    
    signUp(
        name: String
        email: String
        password: String
    ): Token

    signIn(
        login: String
        password: String
    ): Token

    deleteUser(id: ID): Boolean
}

type Token {
    token: String
}

`

