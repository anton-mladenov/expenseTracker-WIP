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
    messages: [Message]
}

extend type Mutation {
    createNewUser(name: String, age: Int): User
    signUp(
        name: String
        email: String
        password: String
    ): Token
}

type Token {
    token: String
}

`

