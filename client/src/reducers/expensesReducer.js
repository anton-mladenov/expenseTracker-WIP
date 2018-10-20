import { CREATE_ONE_EXPENSE, GET_ALL_EXPENSES, GET_ONE_EXPENSE, EDIT_ONE_EXPENSE, DELETE_ONE_EXPENSE } from "../actions/expensesActions"

const initialValue = []

export default (state = initialValue, { type, payload }) => {

    switch (type) {

        case CREATE_ONE_EXPENSE:
            return [...state, payload]

        case GET_ALL_EXPENSES:
            return payload

        case GET_ONE_EXPENSE:
            return [payload]

        case EDIT_ONE_EXPENSE:
            return payload

        // case DELETE_ONE_EXPENSE:
        //     return state

        default:
            return state
    }
}