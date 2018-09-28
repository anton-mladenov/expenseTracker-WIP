import { gql } from "apollo-server-express"

import userTypes from "./usersTypes"
import messagesTypes from "./messagesTypes"

const linkSchema = gql`

type Query {
    _: Boolean
}

type Mutation {
    _: Boolean
}

type Subscriptions {
    _: Boolean
}
`

export default [ linkSchema, userTypes, messagesTypes ]