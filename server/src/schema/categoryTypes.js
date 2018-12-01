import { gql } from "apollo-server-express"

export default gql`

type Category {
    id: ID
    name: String
    amount: Int
    color: String
    user: User
    expenses: [Expense]
}

extend type Query {
    category(id: ID): Category
    categories: [Category]
}
   
extend type Mutation {
    createCategory(name: String, color: String): Category
    updateCategory(id: ID, name: String): Category
    deleteCategory(id: ID): Boolean
}

`