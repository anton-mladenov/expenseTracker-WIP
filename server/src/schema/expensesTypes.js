import { gql } from "apollo-server-express"

export default gql`

type Expense {
    id: ID
    name: String
    amount: Int
    category: Category
    user: User
}

extend type Query {
    expense(id: ID, categoryId: ID): Expense
    allExpenses(categoryId: ID): [Expense]
}

extend type Mutation {
    createExpense(name: String, amount: Int, categoryId: ID): Expense
    updateExpense(id: ID, categoryId: ID, name: String, amount: Int): Expense
    deleteExpense(id: ID): Boolean
}

`