import { gql } from "apollo-server-express"

export default gql`

type Expense {
    id: ID
    name: String
    amount: Int
    category: Category
}

extend type Query {
    expense(id: ID): Expense
    allExpenses: [Expense]
}

extend type Mutation {
    createExpense(name: String, amount: Int, categoryId: ID): Expense
    updateExpense(id: ID, name: String, amount: Int): Expense
    deleteExpense(id: ID): Boolean
}

`