import { gql } from "apollo-server-express"

import userTypes from "./usersTypes"
import categoryTypes from "./categoryTypes"

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

export default [ linkSchema, userTypes, categoryTypes ]