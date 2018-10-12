import { CREATE_ONE_EXPENSE, GET_ALL_EXPENSES } from "../actions/expensesActions"

const initialValue = []

export default (state = initialValue, { type, payload }) => {

    switch (type) {

        case CREATE_ONE_EXPENSE:
            return [...state, payload]

        case GET_ALL_EXPENSES:
            return payload

        default:
            return state
    }
}