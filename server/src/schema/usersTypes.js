import { gql } from "apollo-server-express"

export default gql`

extend type Query {
    user(id: ID!): User
    allUsers: [User]
    me: User
}

type User {
    id: ID
    name: String!
    email: String
    role: String
    messages: [Message]
}

extend type Mutation {
    createNewUser(name: String, age: Int): User
    
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

